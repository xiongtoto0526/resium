import { SkyAtmosphere as CesiumSkyAtmosphere } from "cesium";

import { createCesiumComponent, PickCesiumProps, UnusedCesiumProps, AssertNever } from "../core";

/*
@summary
`SkyAtmosphere` can operate the SkyAtmosphere in the scene.
All properties are applied to single SkyAtmosphere in the scene.
*/

/*
@scope
SkyAtmosphere is available inside [Viewer](/components/Viewer) or [CesiumWidget](/components/CesiumWidget) components.
It can not be used more than once for each Viewer or CesiumWidget.
*/

export type SkyAtmosphereCesiumProps = PickCesiumProps<CesiumSkyAtmosphere, typeof cesiumProps>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type SkyAtmosphereProps = SkyAtmosphereCesiumProps;

const cesiumProps = [
  "brightnessShift",
  "hueShift",
  "saturationShift",
  "show",
  "perFragmentAtmosphere",
] as const;

// Unused prop check
type IgnoredProps = never;
type UnusedProps = UnusedCesiumProps<CesiumSkyAtmosphere, typeof cesiumProps>;
type AssertUnusedProps = AssertNever<Exclude<UnusedProps, IgnoredProps>>;

const SkyAtmosphere = createCesiumComponent<CesiumSkyAtmosphere, SkyAtmosphereProps>({
  name: "SkyAtmosphere",
  create: context => context.scene?.skyAtmosphere,
  cesiumProps,
  setCesiumPropsAfterCreate: true,
});

export default SkyAtmosphere;
