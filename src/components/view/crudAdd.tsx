import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Container, Form, Message } from 'semantic-ui-react';
import toaster from 'toasted-notes';
import { useCrudBasic, ICountry } from '../hooks/crudhook';

export const Add = () => {
    const basichook = useCrudBasic();

    let navigate = useNavigate();

    const { handleCountryChange, create, validation, country } = basichook;
    const { capitalCity, code, name } = country;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const messages = validation(country);
        if (messages.length > 0) {
            messages.map(message => {
                return toaster.notify(<Message
                    negative
                    warning
                    icon='info circle'
                    header={("You cannot submit!! Fix your data")}
                    content={message}
                />);
            })
        } else if (messages.length === 0) {
            await create(country);
            
            toaster.notify(<Message
                success
                icon='info circle'
                header={("Sucees")}
                content="Record has been submitted succesfully"
            />)
            return navigate("/list");
        }

    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Country name</label>
                    <input placeholder='Country Name' name="name" value={name} onChange={handleCountryChange} />
                </Form.Field>
                <Form.Field>
                    <label>Country Code</label>
                    <input placeholder='Last Name' name="code" value={code} onChange={handleCountryChange} />
                </Form.Field>
                <Form.Field>
                    <label>Captial City</label>
                    <input placeholder='Capital city' name="capitalCity" value={capitalCity} onChange={handleCountryChange} />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    );


}