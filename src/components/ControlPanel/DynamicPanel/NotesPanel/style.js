import styled from "styled-components";
export const NoteContainer = styled.div`
  margin-top: 3px;
  margin-bottom: 3px;
  padding: 5px;
  display: flex;
  flex-direction:column;
  background-color: #212529;
  border: 2px solid rgba(75, 75, 75, 0.3);
  border-radius:6px;
  color: whitesmoke;
  &:hover {
    background-color: rgba(46, 204, 113, 0.4);
  }
`;
export const NoteTitle = styled.div`
  font-size: 2vmin;
  padding:7px;
`;
export const NoteContent = styled.div`
  font-size: 1.5vmin;
  padding-left:20px;
`;



