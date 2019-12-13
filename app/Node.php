<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Node extends Model
{
	protected $fillable = [
		'content',
		'title',
		'slug',
	];

	public function lefts()  { return $this->belongsToMany('App\Node', 'node_node', 'right_ref', 'left_ref'  ); }
	public function rights() { return $this->belongsToMany('App\Node', 'node_node', 'left_ref',  'right_ref' ); }
}
