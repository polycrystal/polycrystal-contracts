import { writeJSONToFile } from './helpers/files'
import { Contract } from '@ethersproject/contracts'

// Encode Timelock Transactions
import MasterHealer from '../build/contracts/MasterHealer.json'
import Timelock from '../build/contracts/Timelock.json'

const DEFAULT_OFFSET = 3600 * 6.5;
const getTimestamp = (offsetSeconds = 0): number => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp + offsetSeconds;
}

const MASTER_HEALER_ADDRESS = process.env.MASTER_HEALER_ADDRESS as string;
const TIMELOCK_ADDRESS = process.env.TIMELOCK_ADDRESS as string;

const masterHealerContract = new Contract(MASTER_HEALER_ADDRESS, MasterHealer.abi);
const timelockContract = new Contract(TIMELOCK_ADDRESS, Timelock.abi);

const encode = async () => {
    /*
     * General use MasterHealer functions
     */

    /**
     * Update the multiplier of BANANA minted per block 
     * updateMultiplier(uint256 multiplierNumber)
     */
    // const ETA = getTimestamp(DEFAULT_OFFSET);
    // const method = 'updateMultiplier';
    // const masterHealerTXEncodeFunction = masterHealerContract.populateTransaction[method];
    // const masterHealerArgsArray = [[1]];

    /**
     * Update a farm multiplier by the pid (pool id) 
     * set(uint256 _pid, uint256 _allocPoint, bool _withUpdate)
     */

    //  BNB/DOGE LP (pid38 200-[100]) 0xfd1ef328A17A8e8Eeaf7e4Ea1ed8a108E1F2d096
    //  BNB/LTC LP (pid39 200-[100]) 0x0F12362c017Fe5101c7bBa09390f1CB729f5B318

    // // const ETA = getTimestamp(DEFAULT_OFFSET + (3600 * 24 * 2));
    // const ETA = getTimestamp(DEFAULT_OFFSET);
    // const method = 'set';
    // const masterHealerTXEncodeFunction = masterHealerContract.populateTransaction[method];
    // const masterHealerArgsArray = [
    //     [43, 0, false],
    // ]

    /**
     * Add a new farm to MasterHealer
     * add(uint256 _allocPoint, IBEP20 _lpToken, uint16 _depositFeeBP, bool _withUpdate)
     */
    const ETA = getTimestamp(DEFAULT_OFFSET);
    const method = 'add';
    const masterHealerTXEncodeFunction = masterHealerContract.populateTransaction[method];
    const masterHealerArgsArray = [
        [
            0, //_allocPoint
            "", //_lpToken
            0, //_depositFeeBP
            false, //_withUpdate
        ],
    ]

    let outputs = [];

    for (const masterHealerArgs of masterHealerArgsArray) {
    /**
     * Encode child tx
     */
        const masterHealerTXEncoded = await masterHealerTXEncodeFunction(...masterHealerArgs);

        // queueTransaction(address target, uint value, string memory signature, bytes memory data, uint eta)
        const timelockQueueEncoded = await timelockContract.populateTransaction
            .queueTransaction(
                MASTER_HEALER_ADDRESS,
                0,
                '',
                masterHealerTXEncoded.data,
                ETA
            )

        // executeTransaction(address target, uint value, string memory signature, bytes memory data, uint eta) public payable returns (bytes memory)
        const timelockExecuteEncoded = await timelockContract.populateTransaction
            .executeTransaction(
                MASTER_HEALER_ADDRESS,
                0,
                '',
                masterHealerTXEncoded.data,
                ETA
            )

        // cancelTransaction(address target, uint value, string memory signature, bytes memory data, uint eta)
        const timelockCancelEncoded = await timelockContract.populateTransaction
            .cancelTransaction(
                MASTER_HEALER_ADDRESS,
                0,
                '',
                masterHealerTXEncoded.data,
                ETA
            )

        const output = {
            'ETA-Timestamp': ETA,
            'Date': new Date(ETA * 1000),
            queueTx: "",
            executeTx: "",
            cancelTx: "",
            masterHealerTXEncodeFunction: method,
            masterHealerArgs,
            masterHealerTXEncoded,
            timelockQueueEncoded,
            timelockExecuteEncoded,
            timelockCancelEncoded
        }

        outputs.push(output);
    }

    console.dir(outputs);
    await writeJSONToFile('./scripts/encode-output.json', outputs);
}

encode().then(() => {
    console.log('Done encoding!');
})
