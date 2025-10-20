import { differenceInSeconds, formatDistanceToNow } from 'date-fns';
import { useEffect, useState, type DependencyList } from 'react';

export const useUpdatingDate = (
    date: Date,
    secondsEnabled: boolean = true,
    updateIntervalMs: number = 1000,
    deps: DependencyList = []
) => {
    const [formattedDate, setFormattedDate] = useState<string>('');

    useEffect(() => {
        const update = () => {
            if (!date) return;

            const seconds = differenceInSeconds(new Date(), date);
            if (secondsEnabled && seconds < 60) {
                setFormattedDate(
                    `${seconds}s ago`
                );
            } else {
                setFormattedDate(
                    formatDistanceToNow(new Date(date), { addSuffix: true })
                );
            }
        };

        update();
        const interval = setInterval(update, updateIntervalMs);
        return () => clearInterval(interval);
    }, [deps]);

    return formattedDate;
};
