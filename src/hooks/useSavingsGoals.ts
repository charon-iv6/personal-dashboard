import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SavingsGoal {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  target_date?: string;
  category: string;
}

export function useSavingsGoals(userId: string) {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, [userId]);

  const fetchGoals = async () => {
    const { data, error } = await supabase
      .from('savings_goals')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching savings goals:', error);
      return;
    }

    setGoals(data || []);
    setLoading(false);
  };

  const addGoal = async (goal: Omit<SavingsGoal, 'id'>) => {
    const { data, error } = await supabase
      .from('savings_goals')
      .insert([{ ...goal, user_id: userId }])
      .select()
      .single();

    if (error) {
      console.error('Error adding savings goal:', error);
      return { error };
    }

    setGoals(prev => [...prev, data]);
    return { data };
  };

  const updateGoal = async (id: string, updates: Partial<SavingsGoal>) => {
    const { data, error } = await supabase
      .from('savings_goals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating savings goal:', error);
      return { error };
    }

    setGoals(prev => prev.map(goal => goal.id === id ? data : goal));
    return { data };
  };

  return {
    goals,
    loading,
    addGoal,
    updateGoal,
    refresh: fetchGoals,
  };
}