import { supabase } from '../lib/supabase'

export const goalService = {
  // Get all goals
  async getAllGoals() {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching goals:', error)
      throw error
    }
    
    return data || []
  },

  // Create a new goal
  async createGoal(goalData) {
    const { data, error } = await supabase
      .from('goals')
      .insert([{
        name: goalData.name,
        target_amount: goalData.targetAmount,
        saved_amount: goalData.savedAmount || 0,
        category: goalData.category,
        deadline: goalData.deadline,
        created_at: new Date().toISOString()
      }])
      .select()
    
    if (error) {
      console.error('Error creating goal:', error)
      throw error
    }
    
    return data[0]
  },

  // Update a goal
  async updateGoal(id, goalData) {
    const { data, error } = await supabase
      .from('goals')
      .update({
        name: goalData.name,
        target_amount: goalData.targetAmount,
        category: goalData.category,
        deadline: goalData.deadline,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Error updating goal:', error)
      throw error
    }
    
    return data[0]
  },

  // Delete a goal
  async deleteGoal(id) {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting goal:', error)
      throw error
    }
    
    return true
  },

  // Update saved amount for a goal
  async updateSavedAmount(id, savedAmount) {
    const { data, error } = await supabase
      .from('goals')
      .update({
        saved_amount: savedAmount,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Error updating saved amount:', error)
      throw error
    }
    
    return data[0]
  }
} 