import { Megaverse } from './Megaverse.js';

const run = (candidateId: string) => {
  const universe = new Megaverse(candidateId);

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
const candidateId = args[0];
const command = args[1];

if (!command) {
  throw new Error('You should pick one command: `create` or `delete`');
}

(async (candidateId: string, command: string) => {
  const cli = run(candidateId);

  await cli[command]();
})(candidateId, command);
