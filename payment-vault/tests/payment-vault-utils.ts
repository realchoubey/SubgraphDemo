import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  DepositCompleted,
  OwnershipTransferred,
  WithdrawCompleted
} from "../generated/PaymentVault/PaymentVault"

export function createDepositCompletedEvent(
  token: Address,
  sender: Address,
  amount: BigInt
): DepositCompleted {
  let depositCompletedEvent = changetype<DepositCompleted>(newMockEvent())

  depositCompletedEvent.parameters = new Array()

  depositCompletedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  depositCompletedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  depositCompletedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return depositCompletedEvent
}

export function createOwnershipTransferredEvent(
  currentOwner: Address,
  newOwner: Address,
  transferredTimestamp: BigInt
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "currentOwner",
      ethereum.Value.fromAddress(currentOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "transferredTimestamp",
      ethereum.Value.fromUnsignedBigInt(transferredTimestamp)
    )
  )

  return ownershipTransferredEvent
}

export function createWithdrawCompletedEvent(
  token: Address,
  beneficiary: Address,
  amount: BigInt
): WithdrawCompleted {
  let withdrawCompletedEvent = changetype<WithdrawCompleted>(newMockEvent())

  withdrawCompletedEvent.parameters = new Array()

  withdrawCompletedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  withdrawCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )
  withdrawCompletedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawCompletedEvent
}
