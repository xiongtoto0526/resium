import { Moon as CesiumMoon } from "cesium";
import { createCesiumComponent, PickCesiumProps, UnusedCesiumProps, AssertNever } from "../core";

/*
@summary
`Moon` can operate the moon of the scene.
All properties are applied to single moon of the scene.
*/

/*
@scope
Moon is available inside [Viewer](/components/Viewer) or [CesiumWidget](/components/CesiumWidget) components.
It can not be used more than once for each Viewer or CesiumWidget.
*/

export type MoonCesiumProps = PickCesiumProps<CesiumMoon, typeof cesiumProps>;

export type MoonCesiumReadonlyProps = PickCesiumProps<CesiumMoon, typeof cesiumReadonlyProps>;

export type MoonProps = MoonCesiumProps & MoonCesiumReadonlyProps;

const cesiumProps = ["onlySunLighting", "show", "textureUrl"] as const;

const cesiumReadonlyProps = ["ellipsoid"] as const;

// Unused prop check
type IgnoredProps = never;
type UnusedProps = UnusedCesiumProps<CesiumMoon, typeof cesiumProps | typeof cesiumReadonlyProps>;
type AssertUnusedProps = AssertNever<Exclude<UnusedProps, IgnoredProps>>;

const Moon = createCesiumComponent<CesiumMoon, MoonProps>({
  name: "Moon",
  create(context, props) {
    if (!context.scene) return;
    const element = new CesiumMoon(props);
    context.scene.moon = element;
    return element;
  },
  destroy(_element, context) {
    if (context.scene && !context.scene.isDestroyed()) {
      context.scene.moon = new CesiumMoon();
    }
    // if (!element.isDestroyed()) {
    //   element.destroy();
    // }
  },
  cesiumProps,
  cesiumReadonlyProps,
});

export default Moon;
