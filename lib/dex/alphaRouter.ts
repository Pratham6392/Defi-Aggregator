
import { AlphaRouter } from '@uniswap/smart-order-router'
import { Token, CurrencyAmount, TradeType, Percent } from '@uniswap/sdk-core'
import { ethers, BigNumber } from 'ethers'
import JSBI from 'jsbi'
import ERC20ABI from "@/lib/abi.json"

const INFURA_API_KEY = '3f1d4ff533174d399f6f92e5c8e240dc';
const INFURA_URL_TESTNEY= `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`

const V3_SWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

const chainId = 3
const web3Provider = new ethers.providers.JsonRpcProvider(INFURA_URL_TESTNEY)
const router = new AlphaRouter({ chainId, provider: web3Provider })

const name0 = 'Wrapped Ether'
const symbol0 = 'WETH'
const decimals0 = 18
const address0 = '0xc778417e063141139fce010982780140aa0cd5ab'

const name1 = 'Uniswap Token'
const symbol1 = 'UNI'
const decimals1 = 18
const address1 = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

const WETH = new Token(chainId, address0, decimals0, symbol0, name0)
const UNI = new Token(chainId, address1, decimals1, symbol1, name1)

export const getWethContract = () => new ethers.Contract(address0, ERC20ABI, web3Provider)
export const getUniContract = () => new ethers.Contract(address1, ERC20ABI, web3Provider)

export const getPrice = async (inputAmount :Number, slippageAmount: Number, deadline :number, walletAddress:string) => {
  const percentSlippage = new Percent(JSBI.BigInt(slippageAmount), JSBI.BigInt(100))
  const wei = ethers.utils.parseUnits(inputAmount.toString(), decimals0)
  const currencyAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei))

  const route = await router.route(
    currencyAmount,
    UNI,
    TradeType.EXACT_INPUT,
    {
      recipient: walletAddress,
      slippageTolerance: percentSlippage,
      deadline: deadline,
    }
  )

  if (!route || !route.methodParameters) {
    throw new Error('Route or route method parameters are null or undefined');
  }

  const transaction = {
    data: route.methodParameters.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: BigNumber.from(route.methodParameters.value),
    from: walletAddress,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.utils.hexlify(1000000)
  }

  const quoteAmountOut = route.quote.toFixed(6)
  const ratio = (Number(inputAmount) / parseFloat(quoteAmountOut)).toFixed(3)

  return [
    transaction,
    quoteAmountOut,
    ratio
  ]
}

export const runSwap = async (transaction :any, signer :any) => {
  const approvalAmount = ethers.utils.parseUnits('10', 18).toString()
  const contract0 = getWethContract()
  await contract0.connect(signer).approve(
    V3_SWAP_ROUTER_ADDRESS,
    approvalAmount
  )

  signer.sendTransaction(transaction)
}
