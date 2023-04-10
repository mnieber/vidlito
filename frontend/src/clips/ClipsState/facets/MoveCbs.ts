import { Cbs } from 'aspiration';

export interface Move_move extends Cbs {
  playlistId: string;
  copy: boolean;
  moveItems(): any;
}

export type MoveCbs = {
  move: Move_move;
};
