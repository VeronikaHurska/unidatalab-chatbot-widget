import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import Badge from './components/Badge';
import { GlobalState } from '../../../../store/types';
import { setBadgeCount } from '../../../../store/actions';

import './style.scss';

const openLauncher = require('../../../../../assets/launcher_button.svg') as string;
const close = require('../../../../../assets/clear-button.svg') as string;

type Props = {
  toggle: () => void;
  chatId: string;
  openLabel: string;
  closeLabel: string;
  closeImg: string;
  openImg: string;
  showBadge?: boolean;
}
function Image(props) {
  return <div>
    <svg width="79" height="" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg" >
    <mask id="mask0_20_347"  maskUnits="userSpaceOnUse" x="0" y="0" width="79" height="102">
    <rect x="0.480469" y="0.109375" width="78.5195" height="79" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_20_347)">
    <g filter="url(#filter0_d_20_347)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M147.425 13.4697C147.425 -5.05827 132.405 -20.0781 113.877 -20.0781H98.4269C88.4319 -20.0781 80.3293 -11.9755 80.3293 -1.98047C80.3293 8.01459 72.2267 16.1172 62.2316 16.1172H38.2327C19.1897 16.1172 3.75226 31.5546 3.75226 50.5977C3.75226 69.6407 19.1897 85.0781 38.2327 85.0781H62.2316C72.2267 85.0781 80.3293 93.1807 80.3293 103.176C80.3293 113.171 88.4319 121.273 98.4269 121.273H113.877C132.405 121.273 147.425 106.254 147.425 87.7257V13.4697Z" fill="white"/>
    <circle cx="38.3796" cy="50.5993" r="26.7243" fill="#1A92D6"/>
    <path d="M54.2281 62.5275C54.2281 64.6369 53.3522 66.6151 51.6787 67.8991C47.9939 70.7264 43.383 72.4068 38.3796 72.4068C33.3744 72.4068 28.7619 70.7252 25.0765 67.896C23.4045 66.6125 22.5303 64.6354 22.5303 62.5275C22.5303 60.0657 24.5261 58.0699 26.988 58.0699H49.7705C52.2325 58.0699 54.2281 60.0657 54.2281 62.5275Z" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M38.3734 34.2969L38.1717 34.3104C37.4466 34.4088 36.8875 35.0305 36.8875 35.7828L36.8859 37.2667L29.9527 37.2677C27.4908 37.2677 25.4951 39.2634 25.4951 41.7253V50.6498C25.4951 53.1116 27.4908 55.1074 29.9527 55.1074H46.7928C49.2546 55.1074 51.2504 53.1116 51.2504 50.6498V41.7253C51.2504 39.2634 49.2546 37.2677 46.7928 37.2677L39.8577 37.2667L39.8592 35.7828L39.8458 35.5811C39.7473 34.8559 39.1256 34.2969 38.3734 34.2969ZM31.4386 45.6863C31.4386 44.3193 32.5467 43.2112 33.9137 43.2112C35.2805 43.2112 36.3888 44.3193 36.3888 45.6863C36.3888 47.0532 35.2805 48.1613 33.9137 48.1613C32.5467 48.1613 31.4386 47.0532 31.4386 45.6863ZM40.3395 45.6863C40.3395 44.3193 41.4476 43.2112 42.8146 43.2112C44.1816 43.2112 45.2897 44.3193 45.2897 45.6863C45.2897 47.0532 44.1816 48.1613 42.8146 48.1613C41.4476 48.1613 40.3395 47.0532 40.3395 45.6863Z" fill="white"/>
    </g>
    </g>
    <defs>
    <filter id="filter0_d_20_347" x="-8.24774" y="-26.0781" width="167.673" height="165.352" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="6"/>
    <feGaussianBlur stdDeviation="6"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_20_347"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_20_347" result="shape"/>
    </filter>
    </defs>
    </svg>
  </div>
}


function Launcher({ toggle, chatId, openImg, closeImg, openLabel, closeLabel, showBadge }: Props) {
  const dispatch = useDispatch();
  const { showChat, badgeCount } = useSelector((state: GlobalState) => ({
    showChat: state.behavior.showChat,
    badgeCount: state.messages.badgeCount
  }));

  const toggleChat = () => {
    toggle();
    if (!showChat) dispatch(setBadgeCount(0));
  }

  return (
    <button type="button" className={cn('rcw-launcher', { 'rcw-hide-sm': showChat })} onClick={toggleChat} aria-controls={chatId}>
      {!showChat && showBadge && <Badge badge={badgeCount} />}
      {/* {showChat ?
        <img src={closeImg || close} className="rcw-close-launcher" alt={openLabel} /> :
        <img src={openImg || openLauncher} className="rcw-open-launcher" alt={closeLabel} />
      } */}
      {
        showChat ?
        <Image/>:<Image></Image>
      }
    </button>
  );
}

export default Launcher;
