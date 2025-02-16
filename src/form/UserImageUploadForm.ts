import { DomNode } from "@common-module/app";
import { AppCompConfig, FileDropzone } from "@common-module/app-components";
import { UploadIcon } from "@gaiaprotocol/svg-icons";
import GaiaProtocolConfig from "../core/GaiaProtocolConfig.js";

export default class UserImageUploadForm extends DomNode {
  constructor() {
    super(".user-image-upload-form");

    this.append(
      new FileDropzone(".logo-display", {
        accept: "image/*",
        onUpload: (files) => this.uploadImage(files[0]),
      }, new UploadIcon()),
    );
  }

  private async uploadImage(imageFile: File) {
    const loadingSpinner = new AppCompConfig.LoadingSpinner().appendTo(this);

    const formData = new FormData();
    formData.append("image", imageFile);

    const result = await GaiaProtocolConfig.supabaseConnector
      .callEdgeFunction("upload-user-image", formData);
    console.log(result);

    loadingSpinner.remove();
  }
}
