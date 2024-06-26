<template>
  <b-table
    dark
    sticky-header
    no-border-collapse
    fixed
    striped
    :style="`max-height: ${maxHeight}`"
    class="h-100 m-0 custom-table"
    :fields="highscoreFields"
    :items="highscoreData"
    sort-by="rank"
    :sort-asc="true"
    sort-icon-left
  >
    <!-- headers -->
    <template #head(username)>Player</template>
    <template #head(pointsPerRound)>
      Points/Round
      <small>
        <b-icon-question-circle id="hs-points-tooltip" class="ml-2" scale="1" />
      </small>
      <b-tooltip target="hs-points-tooltip" placement="top" variant="light">
        Players are ranked based on the average number of points earned per round since the number
        of rounds in a game varies.
      </b-tooltip>
    </template>
    <template #head(points)>Total Points</template>
    <!-- cells -->
    <template #cell(rank)="data">
      {{ "#" + data.item.rank }}
    </template>
    <template #cell(pointsPerRound)="data">
      {{ data.item.pointsPerRound.toFixed(2) }}
    </template>
  </b-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { StatsAPI } from "@port-of-mars/client/api/stats/request";
import { SoloHighScoreData } from "@port-of-mars/shared/types";

@Component({})
export default class SoloHighScoresTable extends Vue {
  @Prop({ default: 50 }) limit!: number;
  @Prop({ default: true }) showGameStats!: boolean;
  @Prop({ default: "none" }) maxHeight!: string;

  api!: StatsAPI;

  highscoreData: SoloHighScoreData = [];
  highscoreFields = [
    { key: "rank", sortable: true },
    { key: "username" },
    { key: "pointsPerRound" },
    { key: "points" },
  ];

  async created() {
    await this.fetchSoloHighScoreData();
  }
  async fetchSoloHighScoreData() {
    this.api = new StatsAPI(this.$store, this.$ajax);
    this.highscoreData = await this.api.getSoloHighScoreData(this.limit);
    this.highlightLeaderAndSelf();
  }

  highlightLeaderAndSelf() {
    const highscores = this.highscoreData;
    const { username } = this.$store.state.user;
    const topScore = highscores[0].points;

    highscores
      .filter(player => player.points === topScore)
      .forEach(player => ((player as any)._rowVariant = "success"));

    const self = highscores.find(player => player.username === username);
    if (self) (self as any)._rowVariant = "primary";
  }
}
</script>
