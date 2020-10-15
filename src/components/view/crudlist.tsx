
import React, { useEffect } from 'react';
import { Button, Checkbox, Container, Icon, Table } from 'semantic-ui-react';
import { useCrudBasic } from '../hooks/crudhook';
import data from '../constant/county.json';

export const List = () => {

    const basicHook = useCrudBasic();

    //watches changes of the incoming list request
    useEffect(() => {
        basicHook.list();
    }, [])

    return (
        <Container>
            <Table compact celled definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>Country  Name</Table.HeaderCell>
                        <Table.HeaderCell>Country Capital City</Table.HeaderCell>
                        <Table.HeaderCell>Country Code</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        data.map(a => {
                            return <Table.Row key={a.id} >
                                <Table.Cell collapsing>
                                    <Checkbox slider />
                                </Table.Cell>
                                <Table.Cell>{a.name}</Table.Cell>
                                <Table.Cell>{a.capitalCity}</Table.Cell>
                                <Table.Cell>{a.code}</Table.Cell>
                                <Table.Cell collapsing>
                                    <Button content='Update' primary as='a' href={`/edit/${a.id}`} />
                                </Table.Cell>
                            </Table.Row>

                        })
                    }


                </Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan='4'>
                            <a href="/add">
                                <Button
                                    floated='right'
                                    icon
                                    labelPosition='left'
                                    primary
                                    size='small'
                                >
                                    <Icon name='user' /> Add Country
                            </Button>
                            </a>

                            <Button size='small'>Delete</Button>
                            <Button disabled size='small'>
                                Delete All
                             </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Container>
    );


}

