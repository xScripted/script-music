<script lang="ts">
  import type { IActiveSong } from '../../../interfaces/ISong'
  import { activeSong } from '../scripts/store'

  const formatToDuration = (duration: number): string => {
    let min: number = ~~(duration / 60)
    let sec: number = ~~(duration % 60)

    let secZeros = sec < 10 ? '0' : ''

    return min + ':' + secZeros + sec
  }

  let totalDurationFormatted = '0:00'
  let currentDurationFormatted = '0:00'
  let progressPercentage: number = 0
  let translate: number = 105
  let activeSongValue

  setInterval(() => {
    if (!activeSongValue) return
    if (!activeSongValue.howl) return

    currentDurationFormatted = formatToDuration(~~activeSongValue.howl.seek())

    progressPercentage = (activeSongValue.howl.seek() * 100) / activeSongValue.howl.duration()

    translate = 100 - progressPercentage
  }, 100)

  activeSong.subscribe((value: IActiveSong) => {
    if (!value.howl) return

    activeSongValue = value
    totalDurationFormatted = formatToDuration(~~value.howl.duration())
  })
</script>

<style lang="scss">
  .progress {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;

    .progress-bar {
      background-color: rgba(255, 255, 255, 0.5);
      width: 100%;
      height: 10px;
      border-radius: 25px;
      overflow: hidden;

      .song-progress {
        background: linear-gradient(270deg, #5b0eeb 0%, #6d5dfc 50%, #8abdff 100%);
        height: 100%;
        border-radius: 25px;
      }
    }
  }
</style>

<div class="progress">
  <div class="current-min">{currentDurationFormatted}</div>
  <div class="progress-bar">
    <div class="song-progress" style="transform: translateX(-{translate}%);" />
  </div>
  <div class="duration">{totalDurationFormatted}</div>
</div>
