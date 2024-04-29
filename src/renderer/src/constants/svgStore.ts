export const svgStore = {
  add: '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="M11 13v3q0 .425.288.713T12 17q.425 0 .713-.288T13 16v-3h3q.425 0 .713-.288T17 12q0-.425-.288-.713T16 11h-3V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v3H8q-.425 0-.713.288T7 12q0 .425.288.713T8 13h3Zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"/></svg>',
  addQueue:
    '<svg viewBox="0 -960 960 960"><path d="M640-121v-120H520v-80h120v-120h80v120h120v80H720v120h-80ZM160-240v-80h283q-3 21-2.5 40t3.5 40H160Zm0-160v-80h386q-23 16-41.5 36T472-400H160Zm0-160v-80h600v80H160Zm0-160v-80h600v80H160Z"/></svg>',
  arrow: '<svg viewBox="0 -960 960 960"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>',
  back: '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="M2 12A10 10 0 0 1 12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12m16-1h-8l3.5-3.5l-1.42-1.42L6.16 12l5.92 5.92l1.42-1.42L10 13h8z"/></svg>',
  brush:
    '<svg viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="var(--colorText)" d="m22.017 3.874l-.59 1.581l-.732 1.697c-.679 1.455-1.612 3.156-2.728 4.33c-1.065 1.12-2.673 2.153-3.96 2.886a4.995 4.995 0 0 1-1.36 4.557c-2.27 2.27-4.807 2.27-6.694 1.71a9.068 9.068 0 0 1-2.864-1.43l-.865-.718a.394.394 0 0 1 .027-.624l.332-.237c.728-.53 1.479-1.182 1.658-2.08c.115-.925.18-1.43.197-1.513c.138-.689.43-1.471 1.137-2.18a4.996 4.996 0 0 1 4.557-1.36c.733-1.287 1.765-2.895 2.886-3.96c1.174-1.116 2.875-2.05 4.33-2.728l1.696-.733l1.582-.589a1.094 1.094 0 0 1 1.39 1.39ZM6.99 13.268c-.353.352-.506.734-.591 1.157c-.114.926-.18 1.43-.197 1.514c-.18.904-.709 1.65-1.15 2.148a7.29 7.29 0 0 0 1.471.63c1.384.412 3.09.412 4.71-1.207a3 3 0 1 0-4.243-4.242Zm4.99-1.975a5.028 5.028 0 0 1 1.227 1.228c.391-.227.795-.473 1.19-.732l-.03-.067a3.31 3.31 0 0 0-.66-.93a3.351 3.351 0 0 0-.817-.603l-.18-.086c-.258.395-.504.798-.73 1.19Zm7.442-6.215c-.384.159-.8.34-1.23.54c-1.408.657-2.866 1.48-3.796 2.364c-.157.15-.314.315-.47.493c.362.2.782.49 1.195.904c.414.413.703.833.904 1.195c.178-.156.344-.313.493-.47c.884-.93 1.707-2.388 2.364-3.797c.2-.43.38-.846.54-1.229Z"/></g></svg>',
  delete:
    '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5q0-.425.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.587 1.413T17 21zm5-7.1l1.9 1.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7l-1.9-1.9l1.9-1.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L12 11.1l-1.9-1.9q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l1.9 1.9l-1.9 1.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275z"/></svg>',
  dj: '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" fill-rule="evenodd" d="M17.75 2.222v5.743a1.75 1.75 0 0 1-.78 1.456l-2.554 1.703a.75.75 0 1 1-.832-1.248l2.555-1.703a.25.25 0 0 0 .111-.208V2.069C15.094 2 13.7 2 12 2C7.286 2 4.929 2 3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536c-.683-.684-1.562-1.048-2.785-1.242M6.25 12a5.75 5.75 0 0 1 7.475-5.487a.75.75 0 1 1-.45 1.431A4.25 4.25 0 1 0 16.25 12a.75.75 0 0 1 1.5 0a5.75 5.75 0 0 1-11.5 0m3.75-.75a.75.75 0 0 1 .75.75c0 .69.56 1.25 1.25 1.25a.75.75 0 0 1 0 1.5A2.75 2.75 0 0 1 9.25 12a.75.75 0 0 1 .75-.75" clip-rule="evenodd"/></svg>',
  filter:
    '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="M11 18q-.425 0-.713-.288T10 17q0-.425.288-.713T11 16h2q.425 0 .713.288T14 17q0 .425-.288.713T13 18h-2Zm-4-5q-.425 0-.713-.288T6 12q0-.425.288-.713T7 11h10q.425 0 .713.288T18 12q0 .425-.288.713T17 13H7ZM4 8q-.425 0-.713-.288T3 7q0-.425.288-.713T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8H4Z"/></svg>',
  heart:
    '<svg viewBox="0 -960 960 960"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.412-.587T4 19"/></svg>',
  move: '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="M4 18q-.425 0-.712-.288T3 17q0-.425.288-.712T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12q0-.425.288-.712T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7q0-.425.288-.712T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8z"/></svg>',
  muted:
    '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="m18 13.4l-1.9 1.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l1.9-1.9l-1.9-1.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l1.9 1.9l1.9-1.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L19.4 12l1.9 1.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275zM7 15H4q-.425 0-.712-.288T3 14v-4q0-.425.288-.712T4 9h3l3.3-3.3q.475-.475 1.088-.213t.612.938v11.15q0 .675-.612.938T10.3 18.3z"/></svg>',
  next: '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="M2.5 16.125v-8.25q0-.45.3-.725t.7-.275q.125 0 .275.025t.275.125l6.2 4.15q.225.15.338.363T10.7 12q0 .25-.112.463t-.338.362l-6.2 4.15q-.125.1-.275.125t-.275.025q-.4 0-.7-.275t-.3-.725m10 0v-8.25q0-.45.3-.725t.7-.275q.125 0 .275.025t.275.125l6.2 4.15q.225.15.338.363T20.7 12q0 .25-.112.463t-.338.362l-6.2 4.15q-.125.1-.275.125t-.275.025q-.4 0-.7-.275t-.3-.725"/></svg>',
  nightcore:
    '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="M8.603 2c-.53 0-1 .333-1.178.83l-3.321 9.323a1.75 1.75 0 0 0 1.642 2.337l1.568.006l-1.269 5.669c-.33 1.477 1.487 2.459 2.541 1.371l3.959-4.086a1.895 1.895 0 0 0-.117-.043l-1.386-.45l-.011-.005a1.544 1.544 0 0 1 0-2.911l.011-.005l1.38-.448a1.84 1.84 0 0 0 1.131-1.136l.009-.026l.45-1.384l.004-.012a1.544 1.544 0 0 1 2.913 0l.004.012l.45 1.385l.008.021l2.256-2.328c.768-.793.206-2.12-.898-2.12h-3.958l1.451-4.355A1.25 1.25 0 0 0 15.056 2zm5.25 15.146a2.845 2.845 0 0 1 .686 1.114l.448 1.377a.544.544 0 0 0 1.026 0l.448-1.377a2.837 2.837 0 0 1 1.798-1.796l1.378-.448a.545.545 0 0 0 0-1.025l-.028-.007l-1.378-.448a2.84 2.84 0 0 1-1.798-1.796l-.447-1.377a.544.544 0 0 0-1.027 0l-.448 1.377l-.011.034a2.836 2.836 0 0 1-1.759 1.762l-1.378.448a.545.545 0 0 0 0 1.025l1.378.448c.42.14.8.376 1.113.689m7.93 4.067l-.766-.248a1.578 1.578 0 0 1-.998-.998l-.25-.765a.302.302 0 0 0-.57 0l-.248.764a1.576 1.576 0 0 1-.984.999l-.765.248a.302.302 0 0 0 0 .57l.765.249a1.578 1.578 0 0 1 1 1.002l.248.764a.302.302 0 0 0 .57 0l.249-.764a1.576 1.576 0 0 1 .999-.999l.765-.248a.302.302 0 0 0 0-.57z"/></svg>',
  pause:
    '<svg viewBox="0 0 24 24"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M0 0h24v24H0z"/><path fill="var(--colorText)" d="M9 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m8 0h-2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"/></g></svg>',
  play: '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" fill-rule="evenodd" d="M19.5 14.598c2-1.155 2-4.041 0-5.196l-9-5.196C8.5 3.05 6 4.494 6 6.804v10.392c0 2.31 2.5 3.753 4.5 2.598z" clip-rule="evenodd"/></svg>',
  plus: '<svg viewBox="0 0 20 20"><path fill="var(--colorText)" d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10S4.477 0 10 0Zm0 5.475a.682.682 0 0 0-.682.681V9.28H6.195a.682.682 0 0 0-.674.582l-.008.1c0 .377.305.682.682.682h3.123v3.123c0 .343.252.626.581.675l.101.007a.682.682 0 0 0 .682-.682l-.001-3.123h3.124a.682.682 0 0 0 .674-.58l.008-.102a.682.682 0 0 0-.682-.681l-3.124-.001V6.156a.682.682 0 0 0-.58-.674Z"/></svg>',
  plus2:
    '<svg viewBox="0 0 16 16"><path fill="none" stroke="var(--colorText)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12.75 7.75h-10m5-5v10"/></svg>',
  previous:
    '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="m19.95 16.975l-6.2-4.15q-.225-.15-.337-.362T13.3 12q0-.25.113-.462t.337-.363l6.2-4.15q.125-.1.275-.125t.275-.025q.4 0 .7.275t.3.725v8.25q0 .45-.3.725t-.7.275q-.125 0-.275-.025t-.275-.125m-10 0l-6.2-4.15q-.225-.15-.337-.362T3.3 12q0-.25.113-.462t.337-.363l6.2-4.15q.125-.1.275-.125t.275-.025q.4 0 .7.275t.3.725v8.25q0 .45-.3.725t-.7.275q-.125 0-.275-.025t-.275-.125"/></svg>',
  queue:
    '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="M16 20q-1.25 0-2.125-.875T13 17q0-1.25.875-2.125T16 14q.275 0 .525.038T17 14.2V7q0-.425.288-.713T18 6h3q.425 0 .713.288T22 7q0 .425-.288.713T21 8h-2v9q0 1.25-.875 2.125T16 20ZM4 16q-.425 0-.713-.288T3 15q0-.425.288-.713T4 14h6q.425 0 .713.288T11 15q0 .425-.288.713T10 16H4Zm0-4q-.425 0-.713-.288T3 11q0-.425.288-.713T4 10h10q.425 0 .713.288T15 11q0 .425-.288.713T14 12H4Zm0-4q-.425 0-.713-.288T3 7q0-.425.288-.713T4 6h10q.425 0 .713.288T15 7q0 .425-.288.713T14 8H4Z"/></svg>',
  queueAdd:
    '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="M4 16q-.425 0-.712-.288T3 15q0-.425.288-.712T4 14h5q.425 0 .713.288T10 15q0 .425-.288.713T9 16zm0-4q-.425 0-.712-.288T3 11q0-.425.288-.712T4 10h9q.425 0 .713.288T14 11q0 .425-.288.713T13 12zm0-4q-.425 0-.712-.288T3 7q0-.425.288-.712T4 6h9q.425 0 .713.288T14 7q0 .425-.288.713T13 8zm13 12q-.425 0-.712-.288T16 19v-3h-3q-.425 0-.712-.288T12 15q0-.425.288-.712T13 14h3v-3q0-.425.288-.712T17 10q.425 0 .713.288T18 11v3h3q.425 0 .713.288T22 15q0 .425-.288.713T21 16h-3v3q0 .425-.288.713T17 20"/></svg>',
  repeat:
    '<svg viewBox="0 0 24 24"><g fill="none"><path d="M0 0v24h24V0zm11.407 23.258l.011.002l.071.035l.02.004l.014-.004l.071-.036c.01-.003.019 0 .024.006l.004.01l.017.428l-.005.02l-.01.013l-.104.074l-.015.004l-.012-.004l-.104-.074l-.012-.016l-.004-.017l.017-.427c.002-.01.009-.017.016-.018m-.265-.113l.014.002l.184.093l.01.01l.003.011l-.018.43l-.005.012l-.008.008l-.201.092a.025.025 0 0 1-.029-.008l-.004-.014l.034-.614c.003-.012.01-.02.02-.022m.715.002a.023.023 0 0 1 .027.006l.006.014l.034.614c0 .012-.007.02-.017.024l-.015-.002l-.201-.093l-.01-.008l-.003-.011l-.018-.43l.003-.012l.01-.01z"/><path fill="var(--colorText)" d="M20 9.5a1.5 1.5 0 0 1 1.493 1.356L21.5 11v4a4.5 4.5 0 0 1-4.288 4.495L17 19.5H8.56l-.02.312a21.64 21.64 0 0 1-.011.14c-.056.719-.749 1.17-1.331.865l-.314-.168l-.368-.209a19.716 19.716 0 0 1-.203-.119l-.439-.269a21.11 21.11 0 0 1-.922-.617l-.385-.28l-.323-.245a16.69 16.69 0 0 1-.137-.107c-.489-.39-.47-1.195.05-1.606l.136-.107l.32-.242l.38-.275l.438-.301a21.806 21.806 0 0 1 .714-.457l.426-.255l.375-.211l.316-.17c.577-.3 1.207.085 1.262.756l.038.565H17a1.5 1.5 0 0 0 1.493-1.356L18.5 15v-4A1.5 1.5 0 0 1 20 9.5m-3.198-6.317l.314.168l.368.209c.066.038.134.077.203.119l.439.269a21.065 21.065 0 0 1 .922.617l.385.28l.323.245l.137.107c.489.39.47 1.195-.05 1.606l-.136.107l-.32.242l-.38.275a21.485 21.485 0 0 1-1.152.758l-.426.255l-.375.211l-.316.17c-.577.3-1.207-.085-1.261-.756l-.04-.565H7A1.5 1.5 0 0 0 5.5 9v4a1.5 1.5 0 0 1-3 0V9A4.5 4.5 0 0 1 7 4.5h8.44l.031-.452c.056-.719.749-1.17 1.331-.865"/></g></svg>',
  search:
    '<svg viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><pathd="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="var(--colorText)" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2ZM4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0Z"/></g></svg>',
  settings:
    '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="m9.25 22l-.4-3.2q-.325-.125-.613-.3t-.562-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2h-5.5Zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Z"/></svg>',
  shuffle:
    '<svg viewBox="0 0 17 16"><path fill="var(--colorText)" fill-rule="evenodd" d="M12.121 5.958h1.934v.854a.55.55 0 0 0 .778 0l1.965-1.352a.552.552 0 0 0 0-.778l-1.965-1.495a.548.548 0 0 0-.778 0v.849H12.09c-.195-.008-1.936-.032-3.238 1.222c-.857.824-1.292 1.662-1.292 3.103c0 .873-.226 1.534-.669 1.964c-.697.675-1.771.742-1.818.741H1.084v1.898l4.062.002c.451 0 1.955-.09 3.113-1.194c.861-.819 1.297-1.968 1.297-3.411c0-.873.226-1.226.672-1.662c.702-.686 1.86-.737 1.893-.741m4.719 5.729l-2.027-1.52a.55.55 0 0 0-.778 0v.914h-2.154s-.653.008-1.28-.282l-.909 1.653c.964.445 1.906.48 2.163.48l.063-.001h2.117v.901a.55.55 0 0 0 .778 0l2.027-1.369a.55.55 0 0 0 0-.776M6.555 6.329l1.052-1.618c-1.188-.666-2.445-.633-2.54-.63H1v1.89l4.111-.001c.012.004.778-.015 1.444.359"/></svg>',
  slowed:
    '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="M2 12C2 6.477 6.477 2 12 2c.463 0 .54.693.143.933a6.5 6.5 0 1 0 8.924 8.924c.24-.396.933-.32.933.143c0 1.138-.19 2.231-.54 3.25H22a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1 0-1.5h.54A9.987 9.987 0 0 1 2 12m3 6.25a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 0-1.5zm3 3a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zM19.9 2.307a.483.483 0 0 0-.9 0l-.43 1.095a.484.484 0 0 1-.272.274l-1.091.432a.486.486 0 0 0 0 .903l1.091.432a.48.48 0 0 1 .272.273L19 6.81c.162.41.74.41.9 0l.43-1.095a.484.484 0 0 1 .273-.273l1.091-.432a.486.486 0 0 0 0-.903l-1.091-.432a.484.484 0 0 1-.273-.274z"/><path fill="var(--colorText)" d="M16.033 8.13a.483.483 0 0 0-.9 0l-.157.399a.484.484 0 0 1-.272.273l-.398.158a.486.486 0 0 0 0 .903l.398.157c.125.05.223.148.272.274l.157.399c.161.41.739.41.9 0l.157-.4a.484.484 0 0 1 .272-.273l.398-.157a.486.486 0 0 0 0-.903l-.398-.158a.484.484 0 0 1-.272-.273z"/></svg>',
  tags: '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.11 0-2 .89-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59c.55 0 1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42Z"/></svg>',
  volumeDown:
    '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="M9 15H6q-.425 0-.712-.288T5 14v-4q0-.425.288-.712T6 9h3l3.3-3.3q.475-.475 1.088-.213t.612.938v11.15q0 .675-.612.938T12.3 18.3zm9.5-3q0 1.05-.475 1.988t-1.25 1.537q-.25.15-.512.013T16 15.1V8.85q0-.3.263-.437t.512.012q.775.625 1.25 1.575t.475 2"/></svg>',
  volumeUp:
    '<svg viewBox="0 0 24 24"><path fill="var(--colorText)" d="M19 11.975q0-2.075-1.1-3.787t-2.95-2.563q-.375-.175-.55-.537t-.05-.738q.15-.4.538-.575t.787 0Q18.1 4.85 19.55 7.063T21 11.974q0 2.7-1.45 4.913t-3.875 3.287q-.4.175-.788 0t-.537-.575q-.125-.375.05-.737t.55-.538q1.85-.85 2.95-2.562t1.1-3.788M7 15H4q-.425 0-.712-.288T3 14v-4q0-.425.288-.712T4 9h3l3.3-3.3q.475-.475 1.088-.213t.612.938v11.15q0 .675-.612.938T10.3 18.3zm9.5-3q0 1.05-.475 1.988t-1.25 1.537q-.25.15-.513.013T14 15.1V8.85q0-.3.263-.437t.512.012q.775.625 1.25 1.575t.475 2"/></svg>',
  loading:
    '<svg stroke="var(--colorBrand)" viewBox="0 0 44 44"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle></g></svg>',
  loop: '<svg viewBox="0 0 8 8"><path fill="var(--colorText)" d="M6 0v1H1c-.55 0-1 .45-1 1v1h1V2h5v1l2-1.5zM2 4L0 5.5L2 7V6h5c.55 0 1-.45 1-1V4H7v1H2z"/></svg>',
}

export const svgList = Object.keys(svgStore)
