import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
export interface ProfilesInterface extends Interface {
    getFunction(nameOrSignature: "deleteProfile" | "initialize" | "owner" | "pfpOf" | "profiles" | "renounceOwnership" | "transferOwnership" | "updateProfile"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized" | "OwnershipTransferred" | "ProfileChanged"): EventFragment;
    encodeFunctionData(functionFragment: "deleteProfile", values?: undefined): string;
    encodeFunctionData(functionFragment: "initialize", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "pfpOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "profiles", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "updateProfile", values: [AddressLike, BigNumberish, string]): string;
    decodeFunctionResult(functionFragment: "deleteProfile", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pfpOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "profiles", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateProfile", data: BytesLike): Result;
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
export declare namespace ProfileChangedEvent {
    type InputTuple = [
        _address: AddressLike,
        _pfpAddress: AddressLike,
        _pfpTokenId: BigNumberish,
        _profileData: string
    ];
    type OutputTuple = [
        _address: string,
        _pfpAddress: string,
        _pfpTokenId: bigint,
        _profileData: string
    ];
    interface OutputObject {
        _address: string;
        _pfpAddress: string;
        _pfpTokenId: bigint;
        _profileData: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface Profiles extends BaseContract {
    connect(runner?: ContractRunner | null): Profiles;
    waitForDeployment(): Promise<this>;
    interface: ProfilesInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    deleteProfile: TypedContractMethod<[], [void], "nonpayable">;
    initialize: TypedContractMethod<[], [void], "nonpayable">;
    owner: TypedContractMethod<[], [string], "view">;
    pfpOf: TypedContractMethod<[
        _address: AddressLike
    ], [
        [string, bigint]
    ], "view">;
    profiles: TypedContractMethod<[
        arg0: AddressLike
    ], [
        [
            string,
            bigint,
            string
        ] & {
            pfpAddress: string;
            pfpTokenId: bigint;
            profileData: string;
        }
    ], "view">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    updateProfile: TypedContractMethod<[
        _pfpAddress: AddressLike,
        _pfpTokenId: BigNumberish,
        _profileData: string
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "deleteProfile"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "pfpOf"): TypedContractMethod<[_address: AddressLike], [[string, bigint]], "view">;
    getFunction(nameOrSignature: "profiles"): TypedContractMethod<[
        arg0: AddressLike
    ], [
        [
            string,
            bigint,
            string
        ] & {
            pfpAddress: string;
            pfpTokenId: bigint;
            profileData: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "updateProfile"): TypedContractMethod<[
        _pfpAddress: AddressLike,
        _pfpTokenId: BigNumberish,
        _profileData: string
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "ProfileChanged"): TypedContractEvent<ProfileChangedEvent.InputTuple, ProfileChangedEvent.OutputTuple, ProfileChangedEvent.OutputObject>;
    filters: {
        "Initialized(uint8)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "ProfileChanged(address,address,uint256,string)": TypedContractEvent<ProfileChangedEvent.InputTuple, ProfileChangedEvent.OutputTuple, ProfileChangedEvent.OutputObject>;
        ProfileChanged: TypedContractEvent<ProfileChangedEvent.InputTuple, ProfileChangedEvent.OutputTuple, ProfileChangedEvent.OutputObject>;
    };
}
//# sourceMappingURL=Profiles.d.ts.map