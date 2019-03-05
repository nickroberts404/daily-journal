import React, { Component } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import { Item } from './Item';
import { deleteItem } from '../actions';

const StyledDay = styled.div`
	margin-bottom: .5rem;
`;

const DayName = styled.div`
	display: inline;
	color: #4b5392;
	font-weight: ${props => props.active ? 'bold' : '400'};
	font-size: .75rem;
	cursor: pointer;
`;

const DayOfWeek = styled.span`
	font-weight: 400;
	color: #bbb;
`;

const DayItems = styled.div`
	margin: .25rem 0 0 2rem;
`;

class Day extends Component {
	render() {
		const { day, activeDate, changeActiveDate } = this.props;
		return (
			<StyledDay>
				<DayName active={activeDate === day.date} onClick={() => changeActiveDate(day.date)}>
					{dayjs(day.date).format('MMMM D, YYYY')}
					<DayOfWeek> ({dayjs(day.date).format('dddd')})</DayOfWeek>
				</DayName>
				<Droppable droppableId={day.date}>
					{(provided, snapshot) => (
						<DayItems
							ref={provided.innerRef} 
							{...provided.droppableProps}
						>
							{day.items.map((item, i) => <Item
								key={item.id}
								deleteItem={() => this.props.deleteItem(item.id, day.date)}
								index={i}
								item={item}/>)}
							{provided.placeholder}
						</DayItems>
					)}
				</Droppable>
			</StyledDay>
		);
	}
}

const mapState = (state) => ({activeDate: state.activeDate});

export default connect(mapState, { deleteItem })(Day);
