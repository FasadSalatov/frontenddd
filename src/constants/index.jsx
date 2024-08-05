import { Icons } from "../components";

export const navbarItems = [
    {
        id: 1,
        text: "Click",
        url: "/",
        icon: <Icons.ClickIcon />,
    },
    {
        id: 2,
        text: "Mine",
        url: "/mine",
        icon: <Icons.MineIcon />,
    },
    {
        id: 3,
        text: "Friends",
        url: "/friends",
        icon: <Icons.FriendsIcon />,
    },
    {
        id: 4,
        text: "Earn",
        url: "/earn",
        icon: <Icons.EarnIcon />,
    },
    {
        id: 5,
        text: "Airdrop",
        url: "/airdrop",
        icon: <Icons.StarIcon />,
    },
    {
        id: 6,
        text: "Staking",
        url: "/staking",
        icon: <Icons.StackIcon />,
    },
];

export const infoSectionTitleItemsMinePage = [
    {
        id: 1,
        title: "Markets",
    },
    {
        id: 2,
        title: "PR&Team",
    },
    {
        id: 3,
        title: "Legal",
    },
    {
        id: 4,
        title: "Specials",
    },
];

export const friendList = [
    { id: 1, name: "Mrudul", price: 25 },
    { id: 2, name: "Vladimir", price: 250 },
    { id: 3, name: "Nursat", price: 2250 },
];

const completedDaily = JSON.parse(localStorage.getItem('daily'))

export const dailyTaskItems = [

];

const completedSubscribe = JSON.parse(localStorage.getItem('subscribed'))

export const listTaskItems = [
    {
        id: 1,
        title: "Sub to us on Telegram",
        desc: "Today you will receive",
        price: 5000,
        icon: <Icons.TelegramIcon />,
        completed: completedSubscribe || false,
    },
    {
        id: 2,
        title: "Sub to us on X",
        desc: "Today you will receive",
        price: 5000,
        icon: <Icons.XIcon size={60} />,
        completed: false,
    },
];

const connectWallet = JSON.parse(localStorage.getItem('connectWallet'))

export const airdropListTaskItems = [
    {
        id: 1,
        title: "Connect your wallet",
        icon: <Icons.WalletIcon />,
        completed:  false,
    },
];

export const bonusForTasks = [
    { id: 1, title: "Invite friend", price: 5000 },
    { id: 2, title: "Invite friend with Telegram Premium", price: 10000 },
];
