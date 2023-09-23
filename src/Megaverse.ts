import { Cometh } from './Cometh.js';
import { UniverseObject } from './ifaces.js';
import { Polyanet } from './Polyanet.js';
import { loadCurrentMap, loadGoal } from './services.js';
import { Soloon } from './Soloon.js';
import { sleep, takeProp, toMegaverse } from './utils.js';

type MegaverseObject = Polyanet | Soloon | Cometh;

export class Megaverse {
  private megaverseBlueprint: UniverseObject[][];

  constructor(private readonly godId: string) {}

  public async requestBlueprint(): Promise<boolean> {
    const { ok, data, message } = await loadGoal(this.godId);

    if (!ok) {
      console.log(
        `[REQUEST BLUEPRINT] failed to load blueprint; reason: ${message}`,
      );
      return false;
    }

    this.megaverseBlueprint = data.goal as UniverseObject[][];

    return true;
  }

  public async deleteExistedUniverse(): Promise<boolean> {
    const { ok, data, message } = await loadCurrentMap(this.godId);

    if (!ok) {
      console.log(
        `[DELETE UNIVERSE] failed to load current map; reason: ${message}`,
      );
      return false;
    }

    const existingMap = data.map.content;
    const megaverse: MegaverseObject[] = [];

    for (let row = 0; row < existingMap.length; row++) {
      for (let column = 0; column < existingMap[row].length; column++) {
        const obj = existingMap[row][column];

        if (obj === null) {
          continue;
        }

        switch (obj.type) {
          case 0: {
            megaverse.push(new Polyanet(row, column));
            break;
          }
          case 1: {
            megaverse.push(new Soloon(row, column, obj.color));
            break;
          }
          case 2: {
            megaverse.push(new Cometh(row, column, obj.direction));
            break;
          }
        }
      }
    }

    for (const o of megaverse) {
      const { ok, message } = await o.delete(this.godId);

      if (!ok) {
        console.log(
          `[DELETE GOD CREATION] failed ${o.toString()}; reason: ${message}`,
        );
      } else {
        console.log(`[DELETE GOD CREATION] success ${o.toString()}`);
      }

      await sleep(1000);
    }

    return true;
  }

  public async createMegaverse() {
    const megaverse: MegaverseObject[] = [];

    for (let row = 0; row < this.megaverseBlueprint.length; row++) {
      for (
        let column = 0;
        column < this.megaverseBlueprint[row].length;
        column++
      ) {
        const name = this.megaverseBlueprint[row][column];
        const megaverseObject = toMegaverse(name);

        switch (megaverseObject) {
          case 'POLYANET': {
            megaverse.push(new Polyanet(row, column));
            break;
          }
          case 'COMETH': {
            megaverse.push(new Cometh(row, column, takeProp(name)));
            break;
          }
          case 'SOLOON': {
            megaverse.push(new Soloon(row, column, takeProp(name)));
            break;
          }
        }
      }
    }

    for (const object of megaverse) {
      const { ok, message } = await object.create(this.godId);

      if (!ok) {
        console.log(`[CREATE] failed ${object.toString()}; reason: ${message}`);
      } else {
        console.log(`[CREATE] success ${object.toString()}`);
      }

      await sleep(1000);
    }
  }
}
