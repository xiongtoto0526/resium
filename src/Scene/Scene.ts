import { Scene as CesiumScene, SceneMode } from "cesium";

import {
  createCesiumComponent,
  EventkeyMap,
  PickCesiumProps,
  UnusedCesiumProps,
  AssertNever,
} from "../core";

/*
@summary
`Scene` can operate the scene of the Viewer or CesiumWidget.
All properties are applied to single scene of them.

**Note**: Following code is not recommended as occur extra rendering steps:

```
<Viewer>
  <Scene>
    <Globe>
      <Camera>
        <Entity />
      </Camera>
    </Globe>
  </Scene>
</Viewer>
```

`Scene` component's role is just changing fields of `Viewer#scene`, so following code is recommended.

```
<Viewer>
  <Scene />
  <Globe />
  <Camera />
  <Entity />
</Viewer>
```

For details, refer to "Component location" chapter in [Guide](/guide).
*/

/*
@scope
Scene is available inside [Viewer](/components/Viewer) or [CesiumWidget](/components/CesiumWidget) components.
It can not be used more than once for each Viewer or CesiumWidget.
*/

export type SceneCesiumProps = PickCesiumProps<CesiumScene, typeof cesiumProps>;

export type SceneCesiumEvents = {
  onMorphComplete?: () => void;
  onMorphStart?: () => void;
  onPostRender?: () => void;
  onPreRender?: () => void;
  onPreUpdate?: () => void;
  onRenderError?: () => void;
  onTerrainProviderChange?: () => void;
};

export type SceneProps = SceneCesiumProps &
  SceneCesiumEvents & {
    children?: React.ReactNode;
    mode?: SceneMode;
    // If this prop is set and when `mode` prop is changed, the scene morphs with this duration (seconds).
    morphDuration?: number;
  };

const cesiumProps = [
  "backgroundColor",
  "completeMorphOnUserInput",
  "debugCommandFilter",
  "debugShowCommands",
  "debugShowDepthFrustum",
  "debugShowFramesPerSecond",
  "debugShowFrustumPlanes",
  "debugShowFrustums",
  "debugShowGlobeDepth",
  "eyeSeparation",
  "farToNearRatio",
  "focalLength",
  "fog",
  "fxaa",
  "globe",
  "highDynamicRange",
  "imagerySplitPosition",
  "invertClassification",
  "invertClassificationColor",
  "light",
  "logarithmicDepthBuffer",
  "logarithmicDepthFarToNearRatio",
  "mapMode2D",
  "maximumRenderTimeChange",
  "minimumDisableDepthTestDistance",
  // "mode", // enable morph with animation
  "moon",
  "morphTime",
  "nearToFarDistance2D",
  "pickTranslucentDepth",
  "requestRenderMode",
  "rethrowRenderErrors",
  "shadowMap",
  "skyAtmosphere",
  "skyBox",
  "specularEnvironmentMaps",
  "sphericalHarmonicCoefficients",
  "sun",
  "sunBloom",
  "terrainProvider",
  "useDepthPicking",
  "useWebVR",
] as const;

const cesiumEventProps: EventkeyMap<CesiumScene, SceneCesiumEvents> = {
  onMorphComplete: "morphComplete",
  onMorphStart: "morphStart",
  onPostRender: "postRender",
  onPreRender: "preRender",
  onPreUpdate: "preUpdate",
  onRenderError: "renderError",
  onTerrainProviderChange: "terrainProviderChanged",
};

const morph = (scene: CesiumScene, mode: SceneMode, morphTime?: number) => {
  switch (mode) {
    case SceneMode.SCENE2D:
      scene.morphTo2D(morphTime);
      break;

    case SceneMode.COLUMBUS_VIEW:
      scene.morphToColumbusView(morphTime);
      break;

    case SceneMode.SCENE3D:
      scene.morphTo3D(morphTime);
      break;
  }
};

// Unused prop check
type IgnoredProps = never;
type UnusedProps = UnusedCesiumProps<
  CesiumScene,
  typeof cesiumProps | typeof cesiumEventProps[keyof typeof cesiumEventProps]
>;
type AssertUnusedProps = AssertNever<Exclude<UnusedProps, IgnoredProps>>;

const Scene = createCesiumComponent<CesiumScene, SceneProps>({
  name: "Scene",
  create(context, props) {
    if (context.scene && props.mode) {
      morph(context.scene, props.mode, props.morphDuration);
    }
    return context.scene;
  },
  update(scene, props, prevProps) {
    if (props.mode !== prevProps.mode && props.mode) {
      morph(scene, props.mode, props.morphDuration);
    }
  },
  cesiumProps,
  cesiumEventProps,
  setCesiumPropsAfterCreate: true,
});

export default Scene;
