import { DomNode } from "@common-module/app";
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
    private options;
    private data;
    private logoDisplay;
    constructor(options: LogoInputOptions, data: LogoData);
    private optimizeAndUploadImage;
    private uploadLogoImage;
    private clearLogo;
}
export {};
//# sourceMappingURL=LogoInput.d.ts.map