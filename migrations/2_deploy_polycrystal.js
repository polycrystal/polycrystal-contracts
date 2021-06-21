const { BigNumber } = require("@ethersproject/bignumber");
const MasterHealer = artifacts.require("MasterHealer");
const CrystalToken = artifacts.require("CrystalToken");
const MultiCall = artifacts.require("MultiCall");
const Timelock = artifacts.require("Timelock");
const CrystalMine = artifacts.require("CrystalMine");

const INITIAL_MINT = '20000';
const TOKENS_PER_BLOCK = '8';
const TIMELOCK_DELAY_SECS = (3600 * 6); 
const REWARDS_START = 15983600;
const FARM_FEE_ACCOUNT = process.env.FARM_FEE_ACCOUNT;
const MASTER_ACOUNT = process.env.MASTER_ACOUNT;

module.exports = async function(deployer, network) {
    console.log({network});

    let masterAccount = MASTER_ACOUNT;
    let feeAccount = FARM_FEE_ACCOUNT;
    let crystalTokenInstance;

    /**
     * Deploy CrystalToken
     */
    deployer.deploy(CrystalToken).then((instance) => {
        crystalTokenInstance = instance;
        /**
         * Mint intial tokens for liquidity pool
         */
        return crystalTokenInstance.mint(BigNumber.from(INITIAL_MINT).mul(BigNumber.from(String(10**18))));
    }).then((instance)=> {
        /**
         * Deploy MasterHealer
         */
        if(network == "polygon") {
            console.log(`Deploying MasterHealer with POLYGON MAINNET settings.`)
            return deployer.deploy(MasterHealer, 
                CrystalToken.address,                              
                masterAccount,
                feeAccount,                                          
                BigNumber.from(TOKENS_PER_BLOCK).mul(BigNumber.from(String(10**18))),  
                REWARDS_START                                          
            )
        }
        console.log(`Deploying MasterHealer with DEV/TEST settings`)
        return deployer.deploy(MasterHealer, 
            CrystalToken.address, 
            masterAccount,
            feeAccount,
            BigNumber.from(TOKENS_PER_BLOCK).mul(BigNumber.from(String(10**18))), 
            0
        )
    }).then((instance)=> {
        masterHealerInstance = instance;
        /**
         * TransferOwnership of CRYSTL to MasterHealer
         */
        return crystalTokenInstance.transferOwnership(MasterHealer.address);
    }).then(()=> {
        /**
         * Deploy MultiCall
         */
        return deployer.deploy(MultiCall);
    }).then(()=> {
        /**
         * Deploy Timelock
         */
        return deployer.deploy(Timelock, masterAccount, TIMELOCK_DELAY_SECS);
    }).then(()=> {
        /**
         * Deploy CrystalMine (Autocompounder)
         */
        return deployer.deploy(
            CrystalMine,
            CrystalToken.address,
            MasterHealer.address,
            masterAccount,
            feeAccount
        )
    }).then(()=> {
        console.log('Rewards Start at block: ', REWARDS_START)
        console.table({
            MasterHealer: MasterHealer.address,
            CrystalToken: CrystalToken.address,
            MultiCall: MultiCall.address,
            Timelock: Timelock.address,
            CrystalMine: CrystalMine.address
        })
    });
};