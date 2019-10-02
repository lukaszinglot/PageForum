import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import "./UserCard.css";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  emailAdress: string;
  phone: string;
  webSite: string;
  companyName: string;
  catchPhrase: string;
  bs: string;
  id: string;
}

const CardExampleGroups: React.FC<Props> = ({
  name,
  emailAdress,
  phone,
  webSite,
  companyName,
  catchPhrase,
  bs,
  id
}) => (
  <Card>
    <Card.Content textAlign="left">
      <Image
        floated="right"
        size="mini"
        src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
      />
      <Card.Header>{name}</Card.Header>
      <Card.Meta>{emailAdress}</Card.Meta>
      <Card.Meta>{phone}</Card.Meta>
      <Card.Meta>{webSite}</Card.Meta>
      <Card.Description>{companyName}</Card.Description>
      <Card.Description>{catchPhrase}</Card.Description>
      <Card.Description>{bs}</Card.Description>
    </Card.Content>
    <Card.Content extra className="bottom-card">
      <div className="button">
        <Link to={`/users/${id}`}>
          <Button className="fluid ui widget" inverted>
            Details
          </Button>
        </Link>
      </div>
    </Card.Content>
  </Card>
);

export default CardExampleGroups;
