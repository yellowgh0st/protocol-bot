const { utils } = require("ethers");
const usdvLastMint = require("../../skills/usdvLastMint");
const usdvLastBurn = require("../../skills/usdvLastBurn");
const prettifyNumber = require("../../core/prettifyNumber");

module.exports = {
  priority: 0,
  init: async (client) => {
    let lastMintTimestamp;
    let lastBurnTimestamp;

    const sendHoldersToChannel = async (client) => {
      try {
        const lastMint = await usdvLastMint();
        const lastBurn = await usdvLastBurn();
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const announces = [];
        if (
          lastMint &&
          currentTimestamp - lastMint.timestamp < 300 &&
          lastMintTimestamp != lastMint.timestamp
        ) {
          lastMintTimestamp = lastMint.timestamp;
          const vAmount = Number(utils.formatUnits(lastMint.vAmount, 18));
          const uAmount = Number(utils.formatUnits(lastMint.uAmount, 18));
          const prettyVAmount = prettifyNumber(
            vAmount,
            0,
            vAmount < 1 ? 18 : 5
          );
          const prettyUAmount = prettifyNumber(
            uAmount,
            0,
            uAmount < 1 ? 18 : 5
          );
          announces.push(
            `<:vaderfire:908728100651675719> New Mint **${prettyVAmount} <:vadersymbolwring:914298664741130240>** burnt :twisted_rightwards_arrows: **${prettyUAmount}<:usdvsymbolwring:914298664942465084>** minted`
          );
        }
        if (
          lastBurn &&
          currentTimestamp - lastBurn.timestamp < 300 &&
          lastBurnTimestamp != lastBurn.timestamp
        ) {
          lastBurnTimestamp = lastBurn.timestamp;
          const uAmount = Number(utils.formatUnits(lastBurn.uAmount, 18));
          const vAmount = Number(utils.formatUnits(lastBurn.vAmount, 18));
          const prettyVAmount = prettifyNumber(
            vAmount,
            0,
            vAmount < 1 ? 18 : 5
          );
          const prettyUAmount = prettifyNumber(
            uAmount,
            0,
            uAmount < 1 ? 18 : 5
          );
          announces.push(
            `<:vaderfire:908728100651675719> New Mint **${prettyUAmount} <:usdvsymbolwring:914298664942465084>** burnt :twisted_rightwards_arrows: **${prettyVAmount}<:vadersymbolwring:914298664741130240>** minted`
          );
        }

        if (announces.length > 0) {
          const channel = client.channels.cache.get("936863893073059860");
          await channel.send(announces.join("\n"));
        }
      } catch (err) {
        console.log(err);
      }
    };

    try {
      setInterval(() => {
        sendHoldersToChannel(client);
      }, 5000);
      console.log("Mint/Burn hook initiated");
    } catch (err) {
      console.log("Mint/Burn hook initialization failed");
      console.log(err);
    }
  },
};
