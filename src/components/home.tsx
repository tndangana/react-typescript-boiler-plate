import React from 'react'
import {
    Container,
    Dropdown,
    Header,
    Menu,

} from 'semantic-ui-react'

export const FixedMenuLayout = () => (
    <div>
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' href="/" header>
                    Crud Basic
               </Menu.Item>
                <Menu.Item as='a' href="/">Home</Menu.Item>

                <Dropdown item simple text='Administration'>
                    <Dropdown.Menu>
                        <Dropdown.Item as='a' href="/add">Add Country</Dropdown.Item>
                        <Dropdown.Item as='a' href="/list">List Country</Dropdown.Item>
                        <Dropdown.Divider />
           
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Menu>
        <Container text style={{ marginTop: '7em' }}>
            <Header as='h1'> BASIC BOILER PLATE</Header>
            <p>Start putting flesh to the skeleton</p>
        </Container>
    </div>
)
