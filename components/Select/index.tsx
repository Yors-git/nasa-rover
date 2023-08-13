import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import styles from './Select.module.css';
import { ISelectOption } from '@/Models/models';

interface ISelectProps {
	label: string;
	options: ISelectOption[];
	selectedOption?: string;
	setSelectedOption: (option: string) => void;
	placeholder?: string;
}

const Select: React.FC<ISelectProps> = ({
	label,
	options,
	selectedOption,
	setSelectedOption,
	placeholder
}) => {
	const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(e.target.value);
	};

	return (
		<div className={styles.dropdownContainer}>
			<div className={styles.dropdownContLabel}>
				<Form.Label>{label}:</Form.Label>
			</div>
			<div className={styles.dropdownSelect}>
				<Form.Select
					size='sm'
					aria-label='Default select example'
					value={selectedOption}
					onChange={handleOnChange}
				>
					{placeholder && <option>{placeholder}</option>}
					{options.map(op => (
						<option key={op.id} value={op.value}>
							{op.label}
						</option>
					))}
				</Form.Select>
			</div>
		</div>
	);
};

export default Select;
