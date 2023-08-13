import React, { useState } from 'react';
import styles from './SolInput.module.css';

interface ISolInputProps {
	maxSol?: number;
	setSol: (sol: string) => void;
}

const SolInput: React.FC<ISolInputProps> = ({ maxSol, setSol }) => {
	const [localSol, setLocalSol] = useState<string>('');
	const handleSolSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSol(localSol);
	};

	return (
		<>
			<form onSubmit={handleSolSubmit} className='mt-4'>
				<input
					type='number'
					placeholder=' Enter sol'
					onChange={e => setLocalSol(e.target.value)}
					value={localSol}
				/>
				<button className={styles.button} type='submit'>
					Go
				</button>
			</form>
			<p className={styles.maxVal}>Max Sol Value: {maxSol}</p>
		</>
	);
};

export default SolInput;
