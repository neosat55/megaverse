import { Megaverse } from './Megaverse.js';

const run = () => {
  const godId = 'c02b8fd8-99d8-4bcf-b12a-486df366de89';
  const universe = new Megaverse(godId);

  return {
    create: async () => {
      console.log(`In the beginning God made the heaven and the earth.`);
      const ok = await universe.requestBlueprint();

      if (!ok) {
        console.error(`Oops. Cannot create heaven and earth`);
        return;
      }

      await universe.createMegaverse();
      console.log(`And God said, Let there be light: and there was light.`);
    },
    delete: async () => {
      const ok = await universe.deleteExistedUniverse();

      if (!ok) {
        console.log(`Oops. The universe doesn't want to be deleted`);
      } else {
        console.log(`Universe successufuly deleted`);
      }
    },
  };
};

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  throw new Error('You should pick one command: `create` or `delete`');
}

(async (command: string) => {
  const cli = run();

  await cli[command]();
})(command);
