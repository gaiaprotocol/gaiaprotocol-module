import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
export interface MaterialTradeInterface extends Interface {
    getFunction(nameOrSignature: "buy" | "createMaterial" | "getBuyPrice" | "getBuyPriceAfterFee" | "getPrice" | "getSellPrice" | "getSellPriceAfterFee" | "initialPricePerToken" | "initialize" | "materialOwnerFeePercent" | "owner" | "priceIncrementPerToken" | "protocolFeeDestination" | "protocolFeePercent" | "renounceOwnership" | "sell" | "setMaterialOwnerFeePercent" | "setProtocolFeeDestination" | "setProtocolFeePercent" | "transferOwnership"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized" | "MaterialCreated" | "OwnershipTransferred" | "SetMaterialOwnerFeePercent" | "SetProtocolFeeDestination" | "SetProtocolFeePercent" | "Trade"): EventFragment;
    encodeFunctionData(functionFragment: "buy", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "createMaterial", values: [string, string]): string;
    encodeFunctionData(functionFragment: "getBuyPrice", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getBuyPriceAfterFee", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getPrice", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getSellPrice", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getSellPriceAfterFee", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "initialPricePerToken", values?: undefined): string;
    encodeFunctionData(functionFragment: "initialize", values: [
        AddressLike,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "materialOwnerFeePercent", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "priceIncrementPerToken", values?: undefined): string;
    encodeFunctionData(functionFragment: "protocolFeeDestination", values?: undefined): string;
    encodeFunctionData(functionFragment: "protocolFeePercent", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "sell", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setMaterialOwnerFeePercent", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setProtocolFeeDestination", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setProtocolFeePercent", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createMaterial", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBuyPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBuyPriceAfterFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getSellPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getSellPriceAfterFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialPricePerToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "materialOwnerFeePercent", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "priceIncrementPerToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "protocolFeeDestination", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "protocolFeePercent", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sell", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMaterialOwnerFeePercent", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setProtocolFeeDestination", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setProtocolFeePercent", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
}
export declare namespace InitializedEvent {
    type InputTuple = [version: BigNumberish];
    type OutputTuple = [version: bigint];
    interface OutputObject {
        version: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace MaterialCreatedEvent {
    type InputTuple = [
        materialOwner: AddressLike,
        materialAddress: AddressLike,
        name: string,
        symbol: string
    ];
    type OutputTuple = [
        materialOwner: string,
        materialAddress: string,
        name: string,
        symbol: string
    ];
    interface OutputObject {
        materialOwner: string;
        materialAddress: string;
        name: string;
        symbol: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OwnershipTransferredEvent {
    type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
    type OutputTuple = [previousOwner: string, newOwner: string];
    interface OutputObject {
        previousOwner: string;
        newOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SetMaterialOwnerFeePercentEvent {
    type InputTuple = [percent: BigNumberish];
    type OutputTuple = [percent: bigint];
    interface OutputObject {
        percent: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SetProtocolFeeDestinationEvent {
    type InputTuple = [destination: AddressLike];
    type OutputTuple = [destination: string];
    interface OutputObject {
        destination: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace SetProtocolFeePercentEvent {
    type InputTuple = [percent: BigNumberish];
    type OutputTuple = [percent: bigint];
    interface OutputObject {
        percent: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TradeEvent {
    type InputTuple = [
        trader: AddressLike,
        materialAddress: AddressLike,
        isBuy: boolean,
        amount: BigNumberish,
        price: BigNumberish,
        protocolFee: BigNumberish,
        materialOwnerFee: BigNumberish,
        supply: BigNumberish
    ];
    type OutputTuple = [
        trader: string,
        materialAddress: string,
        isBuy: boolean,
        amount: bigint,
        price: bigint,
        protocolFee: bigint,
        materialOwnerFee: bigint,
        supply: bigint
    ];
    interface OutputObject {
        trader: string;
        materialAddress: string;
        isBuy: boolean;
        amount: bigint;
        price: bigint;
        protocolFee: bigint;
        materialOwnerFee: bigint;
        supply: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface MaterialTrade extends BaseContract {
    connect(runner?: ContractRunner | null): MaterialTrade;
    waitForDeployment(): Promise<this>;
    interface: MaterialTradeInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    buy: TypedContractMethod<[
        materialAddress: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "payable">;
    createMaterial: TypedContractMethod<[
        name: string,
        symbol: string
    ], [
        string
    ], "nonpayable">;
    getBuyPrice: TypedContractMethod<[
        materialAddress: AddressLike,
        amount: BigNumberish
    ], [
        bigint
    ], "view">;
    getBuyPriceAfterFee: TypedContractMethod<[
        materialAddress: AddressLike,
        amount: BigNumberish
    ], [
        bigint
    ], "view">;
    getPrice: TypedContractMethod<[
        supply: BigNumberish,
        amount: BigNumberish
    ], [
        bigint
    ], "view">;
    getSellPrice: TypedContractMethod<[
        materialAddress: AddressLike,
        amount: BigNumberish
    ], [
        bigint
    ], "view">;
    getSellPriceAfterFee: TypedContractMethod<[
        materialAddress: AddressLike,
        amount: BigNumberish
    ], [
        bigint
    ], "view">;
    initialPricePerToken: TypedContractMethod<[], [bigint], "view">;
    initialize: TypedContractMethod<[
        _protocolFeeDestination: AddressLike,
        _protocolFeePercent: BigNumberish,
        _materialOwnerFeePercent: BigNumberish,
        _initialPricePerToken: BigNumberish,
        _priceIncrementPerToken: BigNumberish
    ], [
        void
    ], "nonpayable">;
    materialOwnerFeePercent: TypedContractMethod<[], [bigint], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    priceIncrementPerToken: TypedContractMethod<[], [bigint], "view">;
    protocolFeeDestination: TypedContractMethod<[], [string], "view">;
    protocolFeePercent: TypedContractMethod<[], [bigint], "view">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    sell: TypedContractMethod<[
        materialAddress: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setMaterialOwnerFeePercent: TypedContractMethod<[
        _feePercent: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setProtocolFeeDestination: TypedContractMethod<[
        _feeDestination: AddressLike
    ], [
        void
    ], "nonpayable">;
    setProtocolFeePercent: TypedContractMethod<[
        _feePercent: BigNumberish
    ], [
        void
    ], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "buy"): TypedContractMethod<[
        materialAddress: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "createMaterial"): TypedContractMethod<[
        name: string,
        symbol: string
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "getBuyPrice"): TypedContractMethod<[
        materialAddress: AddressLike,
        amount: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "getBuyPriceAfterFee"): TypedContractMethod<[
        materialAddress: AddressLike,
        amount: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "getPrice"): TypedContractMethod<[
        supply: BigNumberish,
        amount: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "getSellPrice"): TypedContractMethod<[
        materialAddress: AddressLike,
        amount: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "getSellPriceAfterFee"): TypedContractMethod<[
        materialAddress: AddressLike,
        amount: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "initialPricePerToken"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
        _protocolFeeDestination: AddressLike,
        _protocolFeePercent: BigNumberish,
        _materialOwnerFeePercent: BigNumberish,
        _initialPricePerToken: BigNumberish,
        _priceIncrementPerToken: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "materialOwnerFeePercent"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "priceIncrementPerToken"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "protocolFeeDestination"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "protocolFeePercent"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "sell"): TypedContractMethod<[
        materialAddress: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setMaterialOwnerFeePercent"): TypedContractMethod<[_feePercent: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setProtocolFeeDestination"): TypedContractMethod<[_feeDestination: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "setProtocolFeePercent"): TypedContractMethod<[_feePercent: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "MaterialCreated"): TypedContractEvent<MaterialCreatedEvent.InputTuple, MaterialCreatedEvent.OutputTuple, MaterialCreatedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "SetMaterialOwnerFeePercent"): TypedContractEvent<SetMaterialOwnerFeePercentEvent.InputTuple, SetMaterialOwnerFeePercentEvent.OutputTuple, SetMaterialOwnerFeePercentEvent.OutputObject>;
    getEvent(key: "SetProtocolFeeDestination"): TypedContractEvent<SetProtocolFeeDestinationEvent.InputTuple, SetProtocolFeeDestinationEvent.OutputTuple, SetProtocolFeeDestinationEvent.OutputObject>;
    getEvent(key: "SetProtocolFeePercent"): TypedContractEvent<SetProtocolFeePercentEvent.InputTuple, SetProtocolFeePercentEvent.OutputTuple, SetProtocolFeePercentEvent.OutputObject>;
    getEvent(key: "Trade"): TypedContractEvent<TradeEvent.InputTuple, TradeEvent.OutputTuple, TradeEvent.OutputObject>;
    filters: {
        "Initialized(uint8)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "MaterialCreated(address,address,string,string)": TypedContractEvent<MaterialCreatedEvent.InputTuple, MaterialCreatedEvent.OutputTuple, MaterialCreatedEvent.OutputObject>;
        MaterialCreated: TypedContractEvent<MaterialCreatedEvent.InputTuple, MaterialCreatedEvent.OutputTuple, MaterialCreatedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "SetMaterialOwnerFeePercent(uint256)": TypedContractEvent<SetMaterialOwnerFeePercentEvent.InputTuple, SetMaterialOwnerFeePercentEvent.OutputTuple, SetMaterialOwnerFeePercentEvent.OutputObject>;
        SetMaterialOwnerFeePercent: TypedContractEvent<SetMaterialOwnerFeePercentEvent.InputTuple, SetMaterialOwnerFeePercentEvent.OutputTuple, SetMaterialOwnerFeePercentEvent.OutputObject>;
        "SetProtocolFeeDestination(address)": TypedContractEvent<SetProtocolFeeDestinationEvent.InputTuple, SetProtocolFeeDestinationEvent.OutputTuple, SetProtocolFeeDestinationEvent.OutputObject>;
        SetProtocolFeeDestination: TypedContractEvent<SetProtocolFeeDestinationEvent.InputTuple, SetProtocolFeeDestinationEvent.OutputTuple, SetProtocolFeeDestinationEvent.OutputObject>;
        "SetProtocolFeePercent(uint256)": TypedContractEvent<SetProtocolFeePercentEvent.InputTuple, SetProtocolFeePercentEvent.OutputTuple, SetProtocolFeePercentEvent.OutputObject>;
        SetProtocolFeePercent: TypedContractEvent<SetProtocolFeePercentEvent.InputTuple, SetProtocolFeePercentEvent.OutputTuple, SetProtocolFeePercentEvent.OutputObject>;
        "Trade(address,address,bool,uint256,uint256,uint256,uint256,uint256)": TypedContractEvent<TradeEvent.InputTuple, TradeEvent.OutputTuple, TradeEvent.OutputObject>;
        Trade: TypedContractEvent<TradeEvent.InputTuple, TradeEvent.OutputTuple, TradeEvent.OutputObject>;
    };
}
//# sourceMappingURL=MaterialTrade.d.ts.map