import { DomNode } from "@common-module/app";
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
    private options;
    private logoDisplay;
    private _data?;
    constructor(options: LogoInputOptions, initialData?: LogoData);
    private optimizeAndUploadImage;
    private uploadLogoImage;
    get data(): LogoData | undefined;
    set data(data: LogoData | undefined);
}
export {};
//# sourceMappingURL=LogoInput.d.ts.map