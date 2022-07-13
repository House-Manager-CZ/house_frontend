import mbxStaticClient, {
  StaticMapService,
} from "@mapbox/mapbox-sdk/services/static";

export default class MapboxHelper {
  private static token: string;

  private static instance: MapboxHelper;

  private readonly staticMapService: StaticMapService;

  private constructor() {
    if (!process.env.REACT_APP_MAPBOX_TOKEN)
      throw new Error("Mapbox token is not defined");

    MapboxHelper.token = process.env.REACT_APP_MAPBOX_TOKEN;

    this.staticMapService = mbxStaticClient({
      accessToken: MapboxHelper.token,
    });
  }

  public static getInstance() {
    if (!MapboxHelper.instance) MapboxHelper.instance = new MapboxHelper();

    return MapboxHelper.instance;
  }

  get staticClient(): StaticMapService {
    return this.staticMapService;
  }
}
