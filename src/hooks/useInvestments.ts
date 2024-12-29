import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Investment {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'mutual_fund';
  quantity: number;
  purchase_price: number;
  current_price: number;
}

export function useInvestments(userId: string) {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestments();
  }, [userId]);

  const fetchInvestments = async () => {
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching investments:', error);
      return;
    }

    setInvestments(data || []);
    setLoading(false);
  };

  const addInvestment = async (investment: Omit<Investment, 'id'>) => {
    const { data, error } = await supabase
      .from('investments')
      .insert([{ ...investment, user_id: userId }])
      .select()
      .single();

    if (error) {
      console.error('Error adding investment:', error);
      return { error };
    }

    setInvestments(prev => [...prev, data]);
    return { data };
  };

  const updateInvestment = async (id: string, updates: Partial<Investment>) => {
    const { data, error } = await supabase
      .from('investments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating investment:', error);
      return { error };
    }

    setInvestments(prev => prev.map(inv => inv.id === id ? data : inv));
    return { data };
  };

  return {
    investments,
    loading,
    addInvestment,
    updateInvestment,
    refresh: fetchInvestments,
  };
}