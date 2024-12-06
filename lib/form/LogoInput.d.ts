import { DomNode } from "@common-module/app";
interface LogoInputOptions {
    functionName: string;
    onChange: (data: LogoData) => void;
}
interface LogoData {
    logoImageUrl?: string;
    logoThumbnailUrl?: string;
}
export default class LogoInput extends DomNode<HTMLDivElement, {
    dataChanged: (data: LogoData) => void;
}> {
    private options;
    private data?;
    private logoDisplay;
    constructor(options: LogoInputOptions, data?: LogoData | undefined);
    private optimizeAndUploadImage;
    private uploadLogoImage;
    private clearLogo;
}
export {};
//# sourceMappingURL=LogoInput.d.ts.map