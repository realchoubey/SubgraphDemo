import {
  DepositCompleted as DepositCompletedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  WithdrawCompleted as WithdrawCompletedEvent
} from "../generated/PaymentVault/PaymentVault"
import {
  DepositCompleted,
  OwnershipTransferred,
  WithdrawCompleted
} from "../generated/schema"

export function handleDepositCompleted(event: DepositCompletedEvent): void {
  let entity = new DepositCompleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token
  entity.sender = event.params.sender
  entity.amount = event.params.amount

  // Aggregation
  let totalDeposit = entity.totalDeposit
  entity.totalDeposit = totalDeposit.plus(event.params.amount)

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.currentOwner = event.params.currentOwner
  entity.newOwner = event.params.newOwner
  entity.transferredTimestamp = event.params.transferredTimestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawCompleted(event: WithdrawCompletedEvent): void {
  let entity = new WithdrawCompleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token
  entity.beneficiary = event.params.beneficiary
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
