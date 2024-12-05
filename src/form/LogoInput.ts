import { DomNode, ImageOptimizer } from "@common-module/app";
import {
  AppCompConfig,
  Button,
  ButtonType,
  FileDropzone,
} from "@common-module/app-components";
import { DeleteIcon, UploadIcon } from "@gaiaprotocol/svg-icons";
import GaiaProtocolConfig from "../GaiaProtocolConfig.js";

interface LogoInputOptions {
  functionName: string;
}

interface LogoData {
  logoImageUrl?: string;
  logoThumbnailUrl?: string;
}

export default class LogoInput extends DomNode<HTMLDivElement, {
  dataChanged: (data: LogoData) => void;
}> {
  private logoDisplay: FileDropzone;

  constructor(private options: LogoInputOptions, private data: LogoData) {
    super(".logo-input");

    this.append(
      this.logoDisplay = new FileDropzone(".logo-display", {
        accept: "image/*",
        onUpload: (files) => this.uploadLogoImage(files[0]),
      }, new UploadIcon()),
      new Button(".clear", {
        type: ButtonType.Circle,
        icon: new DeleteIcon(),
        onClick: () => this.clearLogo(),
      }),
    );

    this.logoDisplay.style({
      backgroundImage: `url(${this.data.logoImageUrl})`,
    });
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

    this.emit("dataChanged", this.data);

    this.logoDisplay.style({ backgroundImage: `url(${optimizedImageUrl})` });

    loadingSpinner.remove();
  }

  private clearLogo() {
    this.data = {};
    this.emit("dataChanged", this.data);
    this.logoDisplay.style({ backgroundImage: "" });
  }
}
