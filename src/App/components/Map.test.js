import React from 'react';
import Map from './Map';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
configure({ adapter: new Adapter() });

xit('renders without crashing', () => {
    const div = shallow(<Map />);
    expect(div.find(Foo)).to.have.length(3);
});