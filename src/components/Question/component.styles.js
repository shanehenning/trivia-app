import styled from 'styled-components'

export const QuestionContainer = styled.div.attrs(({ guessed }) => {
  return {
    displayAfter: guessed ? 'block' : 'none',
  }
})`
  margin: 0 auto;
  position: relative;
  width: 70%;
  &:after {
    bottom: 0;
    content: ' ';
    display: ${({ displayAfter }) => displayAfter};
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
  }
`

export const TitleQuestion = styled.h2`
  color: white;
  font-family: Raleway, sans-serif;
  margin-bottom: 10px;
`

export const TitleClue = styled.h3`
  background: rgba(255, 255, 255, 0.35);
  border-radius: 8px;
  box-shadow: 0.125rem 0.125rem 0.625rem rgba(0, 0, 0, 0.1);
  color: white;
  font-family: Raleway, sans-serif;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 24px;
  padding: 24px;
  padding-left: 20px;
`

export const TitleCategory = styled.h4`
  color: rgba(255, 255, 255, 0.8);
  font-family: Raleway, sans-serif;
  text-transform: uppercase;
  margin: 0;
`

export const List = styled.ol`
  padding-left: 0;
`

export const ListItem = styled.li.attrs(({ showGuessed, wasCorrect }) => {
  return {
    showGuessed: showGuessed ? 1 : 0,
    wasCorrect: wasCorrect ? '\f00c' : '\f00d',
  }
})`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 0.125rem 0.125rem 0.625rem rgba(0, 0, 0, 0.1);
  color: white;
  cursor: pointer;
  font-family: Open Sans, sans-serif;
  list-style-position: inside;
  margin-bottom: 11px;
  padding: 20px;
  position: relative;
  transition: all 200ms ease;
  &:after {
    content: ${({ wasCorrect }) => JSON.stringify(wasCorrect)};
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    opacity: ${({ showGuessed }) => showGuessed};
    position: absolute;
    right: 20px;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.35);
  }
  &.correct {
    background-color: rgba(0, 133, 91, 0.75);
  }
  &.incorrect {
    background-color: rgba(207, 22, 22, 0.75);
  }
`
