import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Select from '../Select';
import { ISelectOption } from '@/Models/models';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SolInput from '../SolInput';

const roverOptions = [
	{
		id: '0',
		label: 'Curiosity',
		value: 'curiosity'
	},
	{
		id: '1',
		label: 'Opportunity',
		value: 'opportunity'
	},
	{
		id: '2',
		label: 'Spirit',
		value: 'spirit'
	}
];

interface IOptionsSelectorProps {
	cameraOptions: ISelectOption[];
	rover?: string;
	setRover: (rover: string) => void;
	camera?: string;
	selectCamera: (camera: string) => void;
	startDate?: Date | null;
	setStartDate: (date: Date | null) => void;
	isSol: boolean;
	setIsSol: (isSol: boolean) => void;
	sol: string;
	setSol: (sol: string) => void;
	maxSol?: number;
	maxDate?: string;
}

const OptionsSelector: React.FC<IOptionsSelectorProps> = ({
	cameraOptions,
	rover,
	setRover,
	camera,
	selectCamera,
	startDate,
	setStartDate,
	isSol,
	setIsSol,
	sol,
	setSol,
	maxSol,
	maxDate
}) => {
	const dateForPicker = startDate
		? startDate
		: maxDate
		? new Date(`${maxDate}T00:00:00`)
		: null;
	return (
		<Container>
			<Row>
				<Col>
					<Select
						label='Rover'
						options={roverOptions}
						selectedOption={rover}
						setSelectedOption={setRover}
					/>
					<Select
						label='Camera'
						options={cameraOptions}
						selectedOption={camera}
						setSelectedOption={selectCamera}
						placeholder='All'
					/>
				</Col>
				<Col>
					<Row className='mt-3'>
						<Col>
							<div className='my-3 radios'>
								<Form.Check type='radio' id={`check-earth`}>
									<Form.Check.Input
										type='radio'
										checked={!isSol}
										onChange={() => setIsSol(!isSol)}
									/>
									<Form.Check.Label>Filter by Earth Date</Form.Check.Label>
								</Form.Check>
								<Form.Check type='radio' id={`check-sol`}>
									<Form.Check.Input
										type='radio'
										checked={isSol}
										onChange={() => setIsSol(!isSol)}
									/>
									<Form.Check.Label>Filter by Sol</Form.Check.Label>
								</Form.Check>
							</div>
						</Col>
						<Col>
							{isSol ? (
								<SolInput maxSol={maxSol} setSol={setSol} />
							) : (
								<div className='my-4'>
									<DatePicker
										selected={dateForPicker}
										onChange={date => setStartDate(date)}
									/>
									<p style={{ fontSize: '12px', marginTop: '2px' }}>
										Max Date: {maxDate}
									</p>
								</div>
							)}
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default OptionsSelector;
