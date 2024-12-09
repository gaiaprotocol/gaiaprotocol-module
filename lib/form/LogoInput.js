import { DomNode, ImageOptimizer } from "@common-module/app";
import { AppCompConfig, Button, ButtonType, FileDropzone, } from "@common-module/app-components";
import { ObjectUtils } from "@common-module/ts";
import { DeleteIcon, UploadIcon } from "@gaiaprotocol/svg-icons";
import GaiaProtocolConfig from "../GaiaProtocolConfig.js";
export default class LogoInput extends DomNode {
    options;
    logoDisplay;
    _data;
    constructor(options, initialData) {
        super(".logo-input");
        this.options = options;
        this.append(this.logoDisplay = new FileDropzone(".logo-display", {
            accept: "image/*",
            onUpload: (files) => this.uploadLogoImage(files[0]),
        }, new UploadIcon()), new Button(".clear", {
            type: ButtonType.Circle,
            icon: new DeleteIcon(),
            onClick: () => this.data = undefined,
        }));
        this.data = initialData;
    }
    async optimizeAndUploadImage(file, maxSize) {
        const optimized = await ImageOptimizer.optimizeImage(file, maxSize, maxSize);
        const formData = new FormData();
        formData.append("file", optimized);
        const filePath = await GaiaProtocolConfig.supabaseConnector
            .callEdgeFunction(this.options.functionName, formData);
        return `https://storage.googleapis.com/gaiaprotocol/${filePath}`;
    }
    async uploadLogoImage(file) {
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
    get data() {
        return this._data;
    }
    set data(data) {
        if (ObjectUtils.isEqual(this._data, data))
            return;
        this._data = data;
        if (data) {
            this.logoDisplay.style({ backgroundImage: `url(${data.logoImageUrl})` });
            this.addClass("has-thumbnail");
        }
        else {
            this.logoDisplay.style({ backgroundImage: "" });
            this.removeClass("has-thumbnail");
        }
        this.options.onChange(data);
        this.emit("dataChanged", data);
    }
}
//# sourceMappingURL=LogoInput.js.map