<script lang="ts">
  import { get } from 'svelte/store'
  import type { IActiveSong } from '@interfaces/ISong'
  import { player } from '@/scripts/player'
  import { activeSong, fadeTime, djMode, djModeStart, djModeFinish } from '@/scripts/store'

  const formatToDuration = (duration: number): string => {
    let min: number = ~~(duration / 60)
    let sec: number = ~~(duration % 60)

    let secZeros = sec < 10 ? '0' : ''

    return min + ':' + secZeros + sec
  }

  let HTMLProgressBar: HTMLElement

  let totalDurationFormatted = '0:00'
  let currentDurationFormatted = '0:00'
  let progressPercentage: number = 0
  let translate: number = 105
  let holding: boolean = false
  let mousePosition: number
  let activeSongValue

  let flag: boolean = false

  setInterval(() => {
    if (!activeSongValue) return
    if (!activeSongValue.howl) return

    currentDurationFormatted = formatToDuration(~~activeSongValue.howl.seek())

    progressPercentage = (activeSongValue.howl.seek() * 100) / activeSongValue.howl.duration()

    translate = 100 - progressPercentage

    if (holding) progressChange()

    const songOffset: number = activeSongValue.howl.duration() - get(fadeTime)

    if (get(djMode)) {
      const endTime = (activeSongValue.howl.duration() * get(djModeFinish)) / 100

      if (activeSongValue.howl.seek() > endTime && !flag) {
        flag = true
        player.next()
      }
    } else if (activeSongValue.howl.seek() > songOffset && !flag) {
      flag = true
      player.next()
    }

    if (activeSongValue.howl.seek() < songOffset) flag = false
  }, 100)

  activeSong.subscribe((value: IActiveSong) => {
    if (!value.howl) return

    activeSongValue = value
    totalDurationFormatted = formatToDuration(~~value.howl.duration())
  })

  const progressChange = () => {
    let barWidth: number = HTMLProgressBar.getBoundingClientRect().width
    let barOffset: number = (window.innerWidth - barWidth) / 2

    let newProgress: number = ((mousePosition - barOffset) / barWidth) * 100
    let newSec: number = (newProgress * activeSongValue.howl.duration()) / 100

    activeSongValue.howl.seek(newSec)
  }
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

  <!--si levantas el click fuera de la barra no se ejecuta el mouseup-->
  <button
    class="progress-bar"
    bind:this={HTMLProgressBar}
    on:mousedown={() => (holding = true)}
    on:mouseup={() => (holding = false)}
    on:mousemove={(event) => (mousePosition = event.clientX)}
  >
    <div class="song-progress" style="transform: translateX(-{translate}%);" />
  </button>
  <div class="duration">{totalDurationFormatted}</div>
</div>
