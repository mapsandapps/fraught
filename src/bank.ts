import { sample } from "lodash";
import { Direction, Expectation, Occurrence, Stat } from "./types";

export const firstEventBank: Occurrence[] = [
  {
    text: 'You met a lot of folks and had a great time.',
    stat: Stat.belonging,
    direction: Direction.positive
  },{
    text: 'You felt like your presence was valued.',
    stat: Stat.belonging,
    direction: Direction.positive
  },{
    text: 'A lot of helpful people were there.',
    stat: Stat.belonging,
    direction: Direction.positive
  },{
    text: 'You felt very welcomed by several of the attendees.',
    stat: Stat.belonging,
    direction: Direction.positive
  },{
    text: 'You learned a lot about the hobby.',
    stat: Stat.belonging,
    direction: Direction.positive
  }
]

export const expectations: Expectation[] = [
  {
    text: 'You think someone you have a strained relationship with might be there.',
    occurrences: [
      {
        text: 'Someone who just posted some anti-trans meme on Facebook was there.',
        stat: Stat.exclusion,
        direction: Direction.positive
      },{
        text: 'Someone was there who recently insulted your best friend.',
        stat: Stat.exclusion,
        direction: Direction.positive
      }
    ]
  },{
    text: 'You know being there will help make the event better.',
    occurrences: [
      {
        text: 'You were able to help the event organizers.',
        stat: Stat.belonging,
        direction: Direction.positive
      },{
        text: 'You built up goodwill with several of the attendees.',
        stat: Stat.exclusion,
        direction: Direction.negative
      },{
        text: 'You were able to help a newcomer learn the ropes.',
        stat: Stat.belonging,
        direction: Direction.positive
      },{
        text: 'Even though you helped make the event better, you felt like your presence wasn\'t valued.',
        stat: Stat.belonging,
        direction: Direction.negative
      }
    ]
  },{
    text: 'The event quality will be lacking.',
    occurrences: [
      {
        text: 'The venue wasn\'t that good.',
        stat: Stat.belonging,
        direction: Direction.neutral
      },{
        text: 'You didn\'t have a very good time at the event.',
        stat: Stat.belonging,
        direction: Direction.negative
      },{
        text: 'Not many people were there.',
        stat: Stat.belonging,
        direction: Direction.negative
      },{
        text: 'You had to step up and take on a lot of responsibility that you didn\'t really have the energy for.',
        stat: Stat.belonging,
        direction: Direction.positive
      }
    ]
  },{
    text: 'The event will be very high quality.',
    occurrences: [
      {
        text: 'The venue was great!',
        stat: Stat.belonging,
        direction: Direction.neutral
      },{
        text: 'A lot of helpful people were there.',
        stat: Stat.belonging,
        direction: Direction.positive
      }
    ]
  },{
    text: 'You don\'t feel welcome because you were ousted as an organizer of this event.',
    occurrences: [
      {
        text: 'Even though you felt uncomfortable given the history of the situation, you\'re proud of yourself for going to the event anyway.',
        stat: Stat.exclusion,
        direction: Direction.neutral
      },{
        text: 'Because of previously being ousted, you felt grumpy the whole event and didn\'t really enjoy it.',
        stat: Stat.exclusion,
        direction: Direction.positive
      }
    ]
  },{
    text: 'Probably not very many people will be there.',
    occurrences: [
      {
        text: 'Not many people were there. You had to step up and take on a lot of responsibility that you didn\'t really have the energy for.',
        stat: Stat.belonging,
        direction: Direction.neutral
      },{
        text: 'Not many people were there. You were able to step up and take a lot of responsibility, and it made you feel good.',
        stat: Stat.belonging,
        direction: Direction.positive
      }
    ]
  },{
    text: 'Someone will be there who will likely be glad to see you.',
    occurrences: [
      {
        text: 'You were glad you got to chat with an old friend.',
        stat: Stat.belonging,
        direction: Direction.positive
      }
    ]
  },{
    text: 'You think someone you haven\'t seen in a while will be there, and you\'ve been missing them.',
    occurrences: [
      {
        text: 'The person you haven\'t seen in a while didn\'t show up.',
        stat: Stat.belonging,
        direction: Direction.negative
      },{
        text: 'The friend you hadn\'t seen in a while was there, and you had a great time chatting with them!',
        stat: Stat.belonging,
        direction: Direction.positive
      }
    ]
  },{
    text: 'You don\'t expect that any of your allies will be there.',
    occurrences: [
      {
        text: 'You got misgendered all night.',
        stat: Stat.exclusion,
        direction: Direction.positive
      },{
        text: 'None of your allies were there, and you felt really uneasy and on edge the whole time.',
        stat: Stat.exclusion,
        direction: Direction.positive
      }
    ]
  },{
    text: 'There are no health precautions.',
    occurrences: [
      {
        text: 'Someone there seemed sick, and you\'re worried you might be next.',
        stat: Stat.exclusion,
        direction: Direction.positive
      },{
        text: 'Someone was there who has extra health concerns, and you\'re worried they might have gotten sick.',
        stat: Stat.exclusion,
        direction: Direction.positive
      }
    ]
  },{
    text: 'You expect that there will be newcomers there that you can help.',
    occurrences: [
      {
        text: 'You were able to help several newcomers learn the ropes!',
        stat: Stat.belonging,
        direction: Direction.positive
      },{
        text: 'You had hoped to help out some newcomers, but none were there.',
        stat: Stat.belonging,
        direction: Direction.negative
      }
    ]
  },{
    text: 'You\'re worried you\'ll have FOMO if you don\'t go.',
    occurrences: [
      {
        text: 'You learned some interesting information that you might have missed out on if you\'d stayed home.',
        stat: Stat.exclusion,
        direction: Direction.negative
      },{
        text: 'Someone you hadn\'t gotten to see in a long time was there!',
        stat: Stat.belonging,
        direction: Direction.positive
      }
    ]
  },{
    text: 'Your friends aren\'t going, and you\'re worried that you\'ll look unsupportive of them if you go.',
    occurrences: [
      {
        text: 'You felt really grumpy all night because your friends weren\'t there.',
        stat: Stat.belonging,
        direction: Direction.negative
      }
    ]
  },{
    text: 'People are complaining about how the community is fracturing.',
    occurrences: [
      {
        text: 'People have been complaining about how the community is fracturing, but you feel like you going at least means that you\'re not part of the problem.',
        stat: Stat.exclusion,
        direction: Direction.neutral
      },{
        text: 'Your friends didn\'t attend, and you\'re worried you\'re not supporting them.',
        stat: Stat.belonging,
        direction: Direction.negative
      }
    ]
  },{
    text: '"If I go, I\'ll get to participate in the hobby that I love!"',
    occurrences: [
      {
        text: 'You went and overall had a great time!',
        stat: Stat.belonging,
        direction: Direction.neutral
      }
    ]
  }
]

export const getHomeText = (hobby: string): string => {
  const hobbyLowerCase = hobby.toLowerCase()

  const homeTextBank = [
    `You miss your ${hobbyLowerCase} friends.`,
    `You wonder how your ${hobbyLowerCase} friends are doing.`,
    `You miss your ${hobbyLowerCase} friends, but you aren't sure if they're missing you or not. You haven't heard anything from them.`
  ]

  return sample(homeTextBank)!
}
