export default () => ({
  app: {
    appPort: process.env.APP_PORT || 9001,
  },
  api: {
    lotteryDrawService:
      process.env.LOTTERY_DRAW_SERVICE || 'http://localhost:9000',
  },
});
