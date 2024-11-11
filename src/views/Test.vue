<script setup lang="ts">
import LanguageIcon from '@/assets/icons/languages/LanguageIcon.vue';
import CloseIcon from '@/assets/icons/actions/CloseIcon.vue';
import AddIcon from '@/assets/icons/actions/AddIcon.vue';
import ConfirmIcon from '@/assets/icons/actions/ConfirmIcon.vue';
import EditIcon from '@/assets/icons/actions/EditIcon.vue';
import DeleteIcon from '@/assets/icons/actions/DeleteIcon.vue';
import LikeIcon from '@/assets/icons/actions/LikeIcon.vue';
import DislikeIcon from '@/assets/icons/actions/DislikeIcon.vue';
import CopyIcon from '@/assets/icons/actions/CopyIcon.vue';
import ShareIcon from '@/assets/icons/actions/ShareIcon.vue';
import LineArrowBackIcon from '@/assets/icons/arrows/LineArrowBackwardIcon.vue';
import LineArrowForwardIcon from '@/assets/icons/arrows/LineArrowForwardIcon.vue';
import ArrowBackIcon from '@/assets/icons/arrows/ArrowBackwardIcon.vue';
import ArrowForwardIcon from '@/assets/icons/arrows/ArrowForwardIcon.vue';
import DoubleArrowBackIcon from '@/assets/icons/arrows/DoubleArrowBackwardIcon.vue';
import DoubleArrowForwardIcon from '@/assets/icons/arrows/DoubleArrowForwardIcon.vue';
import ArrowUpIcon from '@/assets/icons/arrows/ArrowUpIcon.vue';
import ArrowDownIcon from '@/assets/icons/arrows/ArrowDownIcon.vue';
import YoutubeIcon from '@/assets/icons/socials/YoutubeIcon.vue';
import TelegramIcon from '@/assets/icons/socials/TelegramIcon.vue';
import GithubIcon from '@/assets/icons/socials/GithubIcon.vue';
import VkIcon from '@/assets/icons/socials/VkIcon.vue';
import DiscordIcon from '@/assets/icons/socials/DiscordIcon.vue';
import RussianIcon from '@/assets/icons/languages/RussianIcon.vue';
import EnglishIcon from '@/assets/icons/languages/EnglishIcon.vue';
import AssociationIcon from '@/assets/icons/vocabulary/AssociationIcon.vue';
import SynonymIcon from '@/assets/icons/vocabulary/SynonymIcon.vue';
import ExampleIcon from '@/assets/icons/vocabulary/ExampleIcon.vue';
import DefinitionIcon from '@/assets/icons/vocabulary/DefinitionIcon.vue';
import NoteIcon from '@/assets/icons/vocabulary/NoteIcon.vue';
import FormIcon from '@/assets/icons/vocabulary/FormIcon.vue';
import AntonymIcon from '@/assets/icons/vocabulary/AntonymIcon.vue';
import SimilarIcon from  '@/assets/icons/vocabulary/SimilarIcon.vue';
import TagIcon from  '@/assets/icons/vocabulary/TagIcon.vue';
import TranslationIcon from '@/assets/icons/vocabulary/TranslationIcon.vue';
import SettingsIcon from '@/assets/icons/common/SettingsIcon.vue';
import FavouriteIcon from '@/assets/icons/common/FavouriteIcon.vue';
import AlertIcon from '@/assets/icons/common/AlertIcon.vue';
import MoreIcon from '@/assets/icons/common/MoreIcon.vue'
import HomeIcon from '@/assets/icons/common/HomeIcon.vue'
import CollectionsIcon from '@/assets/icons/collections/CollectionsIcon.vue';
import AddCollectionsIcon from '@/assets/icons/collections/AddCollectionsIcon.vue';
import ExercisesIcon from '@/assets/icons/exercises/ExercisesIcon.vue';
import VocabularyIcon from '@/assets/icons/vocabulary/VocabularyIcon.vue';
import InfoIcon from '@/assets/icons/common/InfoIcon.vue';
import QuestionIcon from '@/assets/icons/common/QuestionIcon.vue';
import BurgerMenuIcon from '@/assets/icons/common/BurgerMenuIcon.vue';
import DicesIcon from '@/assets/icons/common/DicesIcon.vue';
import WordsIcon from '@/assets/icons/vocabulary/WordsIcon.vue';
import EyeOnIcon from '@/assets/icons/common/EyeOnIcon.vue';
import EyeOffIcon from '@/assets/icons/common/EyeOffIcon.vue';
import ImageIcon from '@/assets/icons/common/ImageIcon.vue';
import BellIcon from '@/assets/icons/common/BellIcon.vue';
import PopularIcon from '@/assets/icons/common/PopularIcon.vue';
import ExitIcon from '@/assets/icons/actions/ExitIcon.vue';
import SweepIcon from '@/assets/icons/exercises/SweepIcon.vue';
import CalendarIcon from '@/assets/icons/common/CalendarIcon.vue';
import StarIcon from '@/assets/icons/common/StarIcon.vue';
import ChatIcon from '@/assets/icons/common/ChatIcon.vue';
import HistoryIcon from '@/assets/icons/exercises/HistoryIcon.vue';
import SunIcon from '@/assets/icons/common/SunIcon.vue';
import HalfMoonIcon from '@/assets/icons/common/HalfMoonIcon.vue';
import LoaderIcon from '@/assets/icons/common/LoaderIcon.vue';
import TrophyStatusIcon from '@/assets/icons/vocabulary/status/TrophyStatusIcon.vue';
import FilterIcon from '@/assets/icons/common/FilterIcon.vue';
import ErrorIcon from '@/assets/icons/common/ErrorIcon.vue';
import SearchIcon from '@/assets/icons/common/SearchIcon.vue';
import ProfileIcon from '@/assets/icons/common/ProfileIcon.vue';
import EnterIcon from '@/assets/icons/common/EnterIcon.vue';
import LinksIcon from '@/assets/icons/common/LinksIcon.vue';
import AttachmentsIcon from '@/assets/icons/common/AttachmentsIcon.vue';
import LockerIcon from '@/assets/icons/common/LockerIcon.vue';
import DiscussionsIcon from '@/assets/icons/common/DiscussionsIcon.vue';
import ExpandIcon from '@/assets/icons/arrows/ArrowExpandDownIcon.vue';
</script>

<template>
    <div class="test">
        <h1 class="test--main-title">Демонстрационная страница</h1>

        <details open class="test--block">
            <summary class="test--title">Иконки</summary>

            <div class="test-icons">
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Custom Colors</h3>
                    <LanguageIcon size="32" customColor="red" />
                    <CloseIcon size="32" customColor="green" />
                    <AddIcon size="32" customColor="blue" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Language</h3>
                    <LanguageIcon size="32" />
                    <LanguageIcon size="24" />
                    <LanguageIcon size="20" />
                    <LanguageIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Close</h3>
                    <CloseIcon size="44" />
                    <CloseIcon size="32" />
                    <CloseIcon size="24" />
                    <CloseIcon size="16" />
                    <CloseIcon size="12" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Add</h3>
                    <AddIcon size="32" />
                    <AddIcon size="24" />
                    <AddIcon size="16" />
                    <AddIcon size="12" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Confirm</h3>
                    <ConfirmIcon size="32" />
                    <ConfirmIcon size="24" />
                    <ConfirmIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Edit</h3>
                    <EditIcon size="32" />
                    <EditIcon size="24" />
                    <EditIcon size="20" />
                    <EditIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Edit</h3>
                    <DeleteIcon size="32" />
                    <DeleteIcon size="24" />
                    <DeleteIcon size="20" />
                    <DeleteIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Like</h3>
                    <LikeIcon size="24" outline />
                    <LikeIcon size="24" customColor="#6C8DFF" />
                    <LikeIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Dislike</h3>
                    <DislikeIcon size="24" outline />
                    <DislikeIcon size="24" customColor="#6C8DFF" />
                    <DislikeIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Copy</h3>
                    <CopyIcon size="24" outline />
                    <CopyIcon size="24" customColor="#6C8DFF" />
                    <CopyIcon size="16" outline />
                    <CopyIcon size="16" customColor="#6C8DFF" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Share</h3>
                    <ShareIcon size="32" />
                    <ShareIcon size="24" />
                    <ShareIcon size="20" />
                    <ShareIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Line Arrow Back</h3>
                    <LineArrowBackIcon size="32" />
                    <LineArrowBackIcon size="24" />
                    <LineArrowBackIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Line Arrow Forward</h3>
                    <LineArrowForwardIcon size="32" />
                    <LineArrowForwardIcon size="24" />
                    <LineArrowForwardIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title"> Arrow Back</h3>
                    <ArrowBackIcon size="24" />
                    <ArrowBackIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Arrow Forward</h3>
                    <ArrowForwardIcon size="24" />
                    <ArrowForwardIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Double Arrow Back</h3>
                    <DoubleArrowBackIcon size="24" />
                    <DoubleArrowBackIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Double Arrow Forward</h3>
                    <DoubleArrowForwardIcon size="24" />
                    <DoubleArrowForwardIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Arrow Up</h3>
                    <ArrowUpIcon size="24" />
                    <ArrowUpIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Arrow Down</h3>
                    <ArrowDownIcon size="24" />
                    <ArrowDownIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Youtube</h3>
                    <YoutubeIcon size="32" customColor="#9EB4FF" />
                    <YoutubeIcon size="24" customColor="#9EB4FF" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Github</h3>
                    <GithubIcon size="32" customColor="#9EB4FF" />
                    <GithubIcon size="24" customColor="#9EB4FF" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Vk</h3>
                    <VkIcon size="32" customColor="#9EB4FF" />
                    <VkIcon size="24" customColor="#9EB4FF" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Telegram</h3>
                    <TelegramIcon size="32" customColor="#9EB4FF" />
                    <TelegramIcon size="24" customColor="#9EB4FF" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Discord</h3>
                    <DiscordIcon size="32" customColor="#9EB4FF" />
                    <DiscordIcon size="24" customColor="#9EB4FF" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Russian</h3>
                    <RussianIcon size="32" />
                    <RussianIcon size="24" />
                    <RussianIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">English</h3>
                    <EnglishIcon size="32" />
                    <EnglishIcon size="24" />
                    <EnglishIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Association</h3>
                    <AssociationIcon size="32" />
                    <AssociationIcon size="24" />
                    <AssociationIcon size="20" />
                    <AssociationIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Association</h3>
                    <SynonymIcon size="32" />
                    <SynonymIcon size="24" />
                    <SynonymIcon size="20" />
                    <SynonymIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Example</h3>
                    <ExampleIcon size="32" />
                    <ExampleIcon size="24" />
                    <ExampleIcon size="20" />
                    <ExampleIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Definition</h3>
                    <DefinitionIcon size="32" />
                    <DefinitionIcon size="24" />
                    <DefinitionIcon size="20" />
                    <DefinitionIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Note</h3>
                    <NoteIcon size="32" />
                    <NoteIcon size="24" />
                    <NoteIcon size="20" />
                    <NoteIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Form</h3>
                    <FormIcon size="32" />
                    <FormIcon size="24" />
                    <FormIcon size="20" />
                    <FormIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Antonym</h3>
                    <AntonymIcon size="32" />
                    <AntonymIcon size="24" />
                    <AntonymIcon size="20" />
                    <AntonymIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Similar</h3>
                    <SimilarIcon size="32" />
                    <SimilarIcon size="24" />
                    <SimilarIcon size="20" />
                    <SimilarIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Tag</h3>
                    <TagIcon size="32" />
                    <TagIcon size="24" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Translation</h3>
                    <TranslationIcon size="44" />
                    <TranslationIcon size="32" />
                    <TranslationIcon size="24" />
                    <TranslationIcon size="20" />
                    <TranslationIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Settings</h3>
                    <SettingsIcon size="44" />
                    <SettingsIcon size="32" />
                    <SettingsIcon size="24" />
                    <SettingsIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Favourite</h3>
                    <FavouriteIcon size="32" outline />
                    <FavouriteIcon size="32" customColor="#FF384F" />
                    <FavouriteIcon size="24" outline />
                    <FavouriteIcon size="24" customColor="#FF384F" />
                    <FavouriteIcon size="20" outline />
                    <FavouriteIcon size="20" customColor="#FF384F" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Alert</h3>
                    <AlertIcon size="32" />
                    <AlertIcon size="24" />
                    <AlertIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">More</h3>
                    <MoreIcon size="44" />
                    <MoreIcon size="32" />
                    <MoreIcon size="24" />
                    <MoreIcon size="20" />
                    <MoreIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Home</h3>
                    <HomeIcon size="44" />
                    <HomeIcon size="32" />
                    <HomeIcon size="24" />
                    <HomeIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Collections</h3>
                    <CollectionsIcon size="44" />
                    <CollectionsIcon size="32" />
                    <CollectionsIcon size="24" />
                    <CollectionsIcon size="20" />
                    <CollectionsIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Add Collections</h3>
                    <AddCollectionsIcon size="32" />
                    <AddCollectionsIcon size="24" />
                    <AddCollectionsIcon size="20" />
                    <AddCollectionsIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Exercises</h3>
                    <ExercisesIcon size="44" />
                    <ExercisesIcon size="32" />
                    <ExercisesIcon size="24" />
                    <ExercisesIcon size="20" />
                    <ExercisesIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Vocabulary</h3>
                    <VocabularyIcon size="44" />
                    <VocabularyIcon size="32" />
                    <VocabularyIcon size="24" />
                    <VocabularyIcon size="20" />
                    <VocabularyIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Info</h3>
                    <InfoIcon size="44" />
                    <InfoIcon size="32" />
                    <InfoIcon size="24" />
                    <InfoIcon size="20" />
                    <InfoIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Question</h3>
                    <QuestionIcon size="24" />
                    <QuestionIcon size="16" />
                    <QuestionIcon size="12" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Burger Menu</h3>
                    <BurgerMenuIcon size="44" />
                    <BurgerMenuIcon size="24" />
                    <BurgerMenuIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Dices</h3>
                    <DicesIcon size="44" />
                    <DicesIcon size="32" />
                    <DicesIcon size="24" />
                    <DicesIcon size="20" />
                    <DicesIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Words</h3>
                    <WordsIcon size="32" />
                    <WordsIcon size="24" />
                    <WordsIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Eye On</h3>
                    <EyeOnIcon size="32" />
                    <EyeOnIcon size="24" />
                    <EyeOnIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Eye Off</h3>
                    <EyeOffIcon size="32" />
                    <EyeOffIcon size="24" />
                    <EyeOffIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Image</h3>
                    <ImageIcon size="44" />
                    <ImageIcon size="32" />
                    <ImageIcon size="24" />
                    <ImageIcon size="20" />
                    <ImageIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Bell</h3>
                    <BellIcon size="32" />
                    <BellIcon size="24" />
                    <BellIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Popular</h3>
                    <PopularIcon size="32" />
                    <PopularIcon size="24" />
                    <PopularIcon size="20" />
                    <PopularIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Exit</h3>
                    <ExitIcon size="32" />
                    <ExitIcon size="24" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Sweep</h3>
                    <SweepIcon size="32" />
                    <SweepIcon size="24" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Calendar</h3>
                    <CalendarIcon size="44" />
                    <CalendarIcon size="32" />
                    <CalendarIcon size="24" />
                    <CalendarIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Star</h3>
                    <StarIcon size="44" />
                    <StarIcon size="24" />
                    <StarIcon size="20" />
                    <StarIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Chat</h3>
                    <ChatIcon size="32" />
                    <ChatIcon size="24" />
                    <ChatIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">History</h3>
                    <HistoryIcon size="24" />
                    <HistoryIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Sun</h3>
                    <SunIcon size="24" />
                    <SunIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Half Moon</h3>
                    <HalfMoonIcon size="24" />
                    <HalfMoonIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Loader</h3>
                    <LoaderIcon size="24" />
                    <LoaderIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Achieve</h3>
                    <TrophyStatusIcon size="24" />
                    <TrophyStatusIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Filter</h3>
                    <FilterIcon size="32" />
                    <FilterIcon size="24" />
                    <FilterIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Error</h3>
                    <ErrorIcon size="24" />
                    <ErrorIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Search</h3>
                    <SearchIcon size="32" />
                    <SearchIcon size="24" />
                    <SearchIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Profile</h3>
                    <ProfileIcon size="24" />
                    <ProfileIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Enter</h3>
                    <EnterIcon size="44" />
                    <EnterIcon size="32" />
                    <EnterIcon size="24" />
                    <EnterIcon size="20" />
                    <EnterIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Links</h3>
                    <LinksIcon size="24" />
                    <LinksIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Attachments</h3>
                    <AttachmentsIcon size="24" />
                    <AttachmentsIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Locker</h3>
                    <LockerIcon size="24" />
                    <LockerIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Discussions</h3>
                    <DiscussionsIcon size="24" />
                    <DiscussionsIcon size="16" />
                </div>
                <div class="test-icons--block">
                    <h3 class="test-icons--title">Expand</h3>
                    <ExpandIcon size="24" />
                    <ExpandIcon size="16" />
                </div>
            </div>
        </details>
    </div>
</template>

<style lang="scss" scoped>
.test {
    padding: 2rem 15rem;
}

.test--main-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 600;

}

.test--block {
    padding: 1rem;
    border: .2rem solid #000;
    border-radius: $radius-xl;

    .test--title {
        font-size: 1.8rem;
        margin-bottom: 1rem;
        user-select: none;
    }
}


.test-icons {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;

    .test-icons--block {
        padding: .5rem;
        display: flex;
        flex-direction: column;
        border: .2rem solid #000;

        .test-icons--title {
            width: 100%;
            font-size: 1.2rem;
            text-decoration: underline;
        }
    }
}
</style>