import { Modal } from "@common-module/app-components";
export default class TradeMaterialModal extends Modal<{
    traded: () => void;
}> {
    private address;
    private gameBanner;
    private materialIconDisplay;
    private materialNameDisplay;
    private materialDescriptionDisplay;
    private tabGroup;
    private buyTabContent;
    private sellTabContent;
    constructor(address: `0x${string}`, displayPoweredBy?: boolean);
    private fetchMaterial;
    private changeTab;
}
//# sourceMappingURL=TradeMaterialModal.d.ts.map