import { Direction, Expectation, Hobby, Occurrence, Stat } from "./types";

export const HOBBY_OPTIONS: Hobby[] = [
  { name: 'Rock climbing', emoji: '⛰️' },
  { name: 'Salsa dancing', emoji: '💃' },
  { name: 'Surfing', emoji: '🏄‍♀️' },
  { name: 'Origami', emoji: '💠' },
  { name: 'Foraging', emoji: '🍄' },
  { name: 'Archery', emoji: '🏹' },
  { name: 'Photography', emoji: '📷' },
  { name: 'Birding', emoji: '🦉' },
]

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
  },{
    text: 'You unexpectedly ran into an old friend.',
    stat: Stat.belonging,
    direction: Direction.positive
  }
]

// NOTE: the occurrences with expectations can also happen without their expectation
export const occurrencesWithoutExpectations: Occurrence[] = [
  {
    text: 'Someone walked up to the group and said, "Looks like it\'s just me and the lesbians!" You\'re unsure of why he thinks you\'re a lesbian.',
    stat: Stat.exclusion,
    direction: Direction.positive
  },{
    text: 'Folks know you need a ride to an upcoming event, but nobody offered you one. You aren\'t sure if you\'ll be able to get there.',
    stat: Stat.belonging,
    direction: Direction.negative
  },{
    text: 'People wanted to go out to eat afterwards, but you can\'t afford to eat at that restaurant, and you don\'t want to sit around awkwardly sipping water.',
    stat: Stat.exclusion,
    direction: Direction.positive
  },{
    text: 'People are talking about traveling to an upcoming event, but you won\'t be able to afford to go.',
    stat: Stat.exclusion,
    direction: Direction.positive
  }
]

export const expectations: Expectation[] = [
  {
    text: 'You think someone you have a strained relationship with might be there.',
    direction: Direction.negative,
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
    direction: Direction.positive,
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
    direction: Direction.negative,
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
    direction: Direction.positive,
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
    direction: Direction.negative,
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
    direction: Direction.negative,
    occurrences: [
      {
        text: 'Not many people were there. You had to step up and take on a lot of responsibility that you didn\'t really have the energy for.',
        stat: Stat.belonging,
        direction: Direction.neutral
      },{
        text: 'Not many people were there. You were able to step up and take a lot of responsibility, and it made you feel good.',
        stat: Stat.belonging,
        direction: Direction.positive
      },{
        text: 'Nobody greeted you when you walked into the space, and nobody you\'d previously met had arrived yet.',
        stat: Stat.belonging,
        direction: Direction.negative
      }
    ]
  },{
    text: 'Someone will be there who will likely be glad to see you.',
    direction: Direction.positive,
    occurrences: [
      {
        text: 'You were glad you got to chat with an old friend.',
        stat: Stat.belonging,
        direction: Direction.positive
      }
    ]
  },{
    text: 'You think someone you haven\'t seen in a while will be there, and you\'ve been missing them.',
    direction: Direction.positive,
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
    direction: Direction.negative,
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
    direction: Direction.negative,
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
    direction: Direction.positive,
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
    direction: Direction.positive,
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
    direction: Direction.negative,
    occurrences: [
      {
        text: 'You felt really grumpy all night because your friends weren\'t there.',
        stat: Stat.belonging,
        direction: Direction.negative
      }
    ]
  },{
    text: 'People are complaining about how the community is fracturing.',
    direction: Direction.neutral,
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
    direction: Direction.positive,
    occurrences: [
      {
        text: 'You went and overall had a great time!',
        stat: Stat.belonging,
        direction: Direction.neutral
      }
    ]
  },{
    text: 'You have an uneasy feeling about the event',
    direction: Direction.negative,
    occurrences: [
      {
        text: 'The event was fine, despite your concerns.',
        stat: Stat.exclusion,
        direction: Direction.neutral
      },{
        text: 'You felt really on edge all night.',
        stat: Stat.exclusion,
        direction: Direction.positive
      }
    ]
  },{
    text: 'You haven\'t been to this venue before, and you\'re nervous about the new experience.',
    direction: Direction.negative,
    occurrences: [
      {
        text: 'The venue was great!',
        stat: Stat.belonging,
        direction: Direction.neutral
      },{
        text: 'You arrived at the venue with plenty of time to check everything out and get your bearings. You didn\'t feel anxious at all!',
        stat: Stat.belonging,
        direction: Direction.neutral
      },{
        text: 'When you made it to the venue, you felt rushed. You barely had time to find the bathroom and use it before the event started.',
        stat: Stat.belonging,
        direction: Direction.neutral
      },{
        text: 'You had to look around quite a while to find the meeting point. You were anxious that you weren\'t going to be able to find it and would have to head home.',
        stat: Stat.exclusion,
        direction: Direction.positive
      },{
        text: 'You looked around a while and couldn\'t figure out where the event was being held. You were about to give up and leave when you finally saw someone you recognized and were able to follow them.',
        stat: Stat.exclusion,
        direction: Direction.positive
      }
    ]
  }
]

export const getHomeText = (hobby: string, belonging: number): string => {
  if (belonging > 67) {
    return `You miss your ${hobby} friends.`
  }
  if (belonging > 33) {
    return `You wonder how your ${hobby} friends are doing.`
  }
  return `You miss your ${hobby} friends, but you aren't sure if they're missing you or not. You haven't heard anything from them.`
}
