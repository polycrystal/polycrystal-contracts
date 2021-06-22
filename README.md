# Welcome to PolyCrystal.Finance 💎

This repo is dedicated to the smart contracts used to manage the farming functionality on PolyCrystal! Read on below to get all the deets 😄

https://PolyCrystal.Finance 

## MasterHealer 🙏
MasterHealer is a fork of the GooseDeFi MasterChefV2 contract (which was originally derived from Pancake's MasterChef). We did this so we could include the following updates:

- Removal of the Migrator function, for user safety.
- Removal of the SYRUP token, as there were known vulnerabilities with this.
- Addition of deposit fees, so we can fund projects for you lovely crystal fanatics ❤️

## CrystalToken 🔮
CRYSTL is the token which powers our yield farm. This is a pretty standard ERC20 token forked from ApeSwap's BANANA token contract.

## CrystalMine ⛏
CrystalMine is a contract that allows us to provide our users an auto-compunding vault, where they can turn their CRYSTAL into even more CRYSTL without the need to manually compound!

## Timelock 🔒
Timelock is a contract used to provide enhanced security to PolyCrystal.Finance's smart contract, by creating a buffer in which farm-modifying functions can be executed.

## Multicall 📞
Boilerplate multicall contract used to optimize data fetches from the frontend.


# Mainnet Contracts ✅

Here are the mainnet Polygon contracts used to power PolyCrystal.Finance 💎

- MasterHealer: [0xeBCC84D2A73f0c9E23066089C6C24F4629Ef1e6d](https://polygonscan.com/address/0xeBCC84D2A73f0c9E23066089C6C24F4629Ef1e6d)
- CrystalToken: [0x76bF0C28e604CC3fE9967c83b3C3F31c213cfE64](https://polygonscan.com/address/0x76bF0C28e604CC3fE9967c83b3C3F31c213cfE64)
- MultiCall: [0xCcc53A4E1A949C999f16942232bB64e281e977C6](https://polygonscan.com/address/0xCcc53A4E1A949C999f16942232bB64e281e977C6)
- Timelock: [0x12fC8F5Cfb609981C6F6D141f0fb0BCE0b990145](https://polygonscan.com/address/0x12fC8F5Cfb609981C6F6D141f0fb0BCE0b990145)
- CrystalMine: [0x5BaDd6C71fFD0Da6E4C7D425797f130684D057dd](https://polygonscan.com/address/0x5BaDd6C71fFD0Da6E4C7D425797f130684D057dd)