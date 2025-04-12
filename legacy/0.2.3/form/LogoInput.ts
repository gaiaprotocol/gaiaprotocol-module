import { DomNode, ImageOptimizer } from "@common-module/app";
import {
  AppCompConfig,
  Button,
  ButtonType,
  FileDropzone,
} from "@common-module/app-components";
import { ObjectUtils } from "@common-module/ts";
import { DeleteIcon, UploadIcon } from "@gaiaprotocol/svg-icons";
import GaiaProtocolConfig from "../core/GaiaProtocolConfig.js";

interface LogoInputOptions {
  functionName: string;
  onChange: (data: LogoData | undefined) => void;
}

export interface LogoData {
  logoImageUrl?: string;
  logoThumbnailUrl?: string;
}

export default class LogoInput extends DomNode<HTMLDivElement, {
  dataChanged: (data: LogoData | undefined) => void;
}> {
  private logoDisplay: FileDropzone;
  private _data?: LogoData;

  constructor(
    private options: LogoInputOptions,
    initialData?: LogoData,
  ) {
    super(".logo-input");

    this.append(
      this.logoDisplay = new FileDropzone(".logo-display", {
        accept: "image/*",
        onUpload: (files) => this.uploadLogoImage(files[0]),
      }, new UploadIcon()),
      new Button(".clear", {
        type: ButtonType.Icon,
        icon: new DeleteIcon(),
        onClick: () => this.data = undefined,
      }),
    );

    this.data = initialData;
  }

  private async optimizeAndUploadImage(file: File, maxSize: number) {
    const optimized = await ImageOptimizer.optimizeImage(
      file,
      maxSize,
      maxSize,
    );

    const formData = new FormData();
    formData.append("file", optimized);

    const filePath = await GaiaProtocolConfig.supabaseConnector
      .callEdgeFunction(this.options.functionName, formData);

    return `https://storage.googleapis.com/gaiaprotocol/${filePath}`;
  }

  private async uploadLogoImage(file: File) {
    const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(this);

    const [optimizedImageUrl, thumbnailImageUrl] = await Promise.all([
      this.optimizeAndUploadImage(file, 1024),
      this.optimizeAndUploadImage(file, 120),
    ]);

    this.data = {
      logoImageUrl: optimizedImageUrl,
      logoThumbnailUrl: thumbnailImageUrl,
    };

    loadingSpinner.remove();
  }

  public get data(): LogoData | undefined {
    return this._data;
  }

  public set data(data: LogoData | undefined) {
    if (ObjectUtils.isEqual(this._data, data)) return;

    this._data = data;

    if (data) {
      this.logoDisplay.style({ backgroundImage: `url(${data.logoImageUrl})` });
      this.addClass("has-thumbnail");
    } else {
      this.logoDisplay.style({ backgroundImage: "" });
      this.removeClass("has-thumbnail");
    }

    this.options.onChange(data);
    this.emit("dataChanged", data);
  }
}
