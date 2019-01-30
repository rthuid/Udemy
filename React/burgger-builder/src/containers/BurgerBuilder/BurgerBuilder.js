import React, {Component} from 'react';

import Burger from '../../components/Burger/Burger';
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 4,
            cheese: 5,
            meat: 2
        }
    }

    render () {
        return (
            <>
                <Burger ingredients={this.state.ingredients} />
                <div>Burger Controls</div>
            </>
        );
    }
}

export default BurgerBuilder;