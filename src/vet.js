import React, {Component} from 'react';
import { Menu, Container, Dropdown, Image, Header } from 'semantic-ui-react'

import LOGO from './assets/HTML5_Badge_256.png';

class Vet extends Component {
  render () {
    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image
                size='mini'
                src={LOGO}
                style={{ marginRight: '1.5em' }}
              />
              Vet Appointments
            </Menu.Item>
            <Menu.Item as='a'>Home</Menu.Item>

            <Dropdown item simple text='Dropdown'>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Header Item</Dropdown.Header>
                <Dropdown.Item>
                  <i className='dropdown icon' />
                  <span className='text'>Submenu</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>
        <Container style={{ marginTop: '7em' }}>
          <Header as='h1'>Semantic UI React Fixed Template</Header>
          <p>This is a basic fixed menu template using fixed size containers.</p>
          <p>A text container is used for the main container, which is useful for single column layouts.</p>

          <Image src='/assets/images/wireframe/media-paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/assets/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/assets/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/assets/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/assets/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/assets/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/assets/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      </Container>
      </div>
    )
  }
}

export default Vet;
