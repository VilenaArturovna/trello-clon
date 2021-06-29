import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const Window = styled.div`
  width: 768px;
  height: 900px;
  background-color: blanchedalmond;
`
const Wrapper = styled.div`
  flex-direction: column;
`
const Header = styled.div`
  margin: 12px 40px 8px 56px;
  min-height: 32px;
  position: relative;
  z-index: 1;
`
const Title = styled.div`
  margin: 4px 0 0;
  padding: 8px 0 0;
`
const HeaderInlineContent = styled.div`
  cursor: default;
  display: inline-block;
  margin: 4px 8px 4px 2px;
`
const Main = styled.div`
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 24px;
  padding: 0 8px 8px 16px;
  position: relative;
  width: 552px;
  z-index: 0;
`
const Description = styled.div`
  margin-bottom: 24px;
  position: relative;
`
const Actions = styled.div`
  margin-bottom: 24px;
  position: relative;
`

export const CardDetails = () => {
    return (
        <Container>
            <Window>
                <Wrapper>
                    <Header>
                        <Title>
                            Title of Card
                        </Title>
                        <HeaderInlineContent>
                            column: Title of column
                        </HeaderInlineContent>
                    </Header>
                    <Main>
                        <Description>
                            Decsription
                        </Description>
                        <Actions>
                            Actions
                            Comments
                        </Actions>
                    </Main>
                </Wrapper>
            </Window>
        </Container>
    )
}