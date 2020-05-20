import { TgPlayer } from './../api/models/models';
import { TgCard } from 'src/app/shared/api/models/models';

export function findClueCard(player: TgPlayer, cardName: string): TgCard {
  return player.clueCards.find(card => card.name === cardName)
}

export function findMeansCard(player: TgPlayer, cardName: string): TgCard {
  return player.meansCards.find(card => card.name === cardName);
}